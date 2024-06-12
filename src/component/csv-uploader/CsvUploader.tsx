import React, { useState } from 'react';
import Papa from 'papaparse';
import { CsvData } from '../../lib';

interface CsvUploaderProps {
  onCsvData: (data: CsvData) => void;
};

const CsvUploader: React.FC<CsvUploaderProps> = ({ onCsvData }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== 'text/csv') {
      setError('Please upload a CSV file.');
      return;
    }

    setFile(selectedFile);
    setUploading(true);
    setError('');

    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        onCsvData(results.data as CsvData);
        setUploading(false);
      },
      error: (error) => {
        setError('Failed to parse CSV file. Please try again.');
        setUploading(false);
      }
    });
  };

  return (
    <div className="inactive:hidden active " id="input_file-tab-upload">
      <div id="upload-form" >
        {error && <div className="text-red-500">{error}</div>}
        <form className="upload">
          <label
            className="relative bg-primary-50 border-2 border-primary-100 hover:border-primary-400 hover:border-4 rounded-lg min-h-[200px] cursor-pointer flex flex-col items-center justify-center text-center text-primary-300 hover:text-primary-800 border-dashed"
            id="drop-target"
          >
            <span className="block">
              {file ? file.name : 'Drag and drop a file here, or click to select'}
            </span>
            {file && (
              <span className="text-sm font-bold">
                <span>{(file.size / 1024).toFixed(2)} KB</span>
              </span>
            )}
            <div className="text-center pt-4">
              <span className="btn btn-secondary text-left text-sm">
                Choose a different file
              </span>
            </div>
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default CsvUploader;
