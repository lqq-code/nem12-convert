'use client';

import React, { useState } from 'react';
import Papa from 'papaparse';
import { CsvData } from '../types';

type CsvUploaderProps = {
  onCsvData: (data: CsvData) => void;
};

const CsvUploader: React.FC<CsvUploaderProps> = ({ onCsvData }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setUploading(true);

    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        onCsvData(results.data as CsvData);
        setUploading(false);
      },
    });
  };

  const renderUploadStatus = () => {
    if (!uploading) return null;
    return (
      <div className="text-center flex flex-col items-center justify-center bg-slate-50 rounded p-4">
        <div className="text-sm pt-2 text-slate-500">
          <span className="file-name">{file?.name}</span>
        </div>
        <span className="text-sm font-bold">
          <span className="total-size">{(file?.size / 1024).toFixed(2)} kB</span>
        </span>
      </div>
    );
  };

  return (
    <div className="inactive:hidden active" id="input_file-tab-upload">
      <div id="upload-form">
        {renderUploadStatus()}
        {!uploading && (
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
        )}
      </div>
    </div>
  );
};

export default CsvUploader;
