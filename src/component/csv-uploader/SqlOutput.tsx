import React, { useState, useEffect } from 'react';
import { generateSQL } from '../../utils/sqlGenerator';
import { CsvData } from '../../lib';
import LoadingComponent from '../Loading/Loading';

interface SqlOutputProps {
    csvData: CsvData | null;
};

const SqlOutput: React.FC<SqlOutputProps> = ({ csvData }) => {
    const [sql, setSql] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);


    const copyToClipboard = () => {
        navigator.clipboard.writeText(sql)
            .then(() => alert('SQL copied to clipboard'))
            .catch((error) => console.error('Failed to copy: ', error));
    };

    const handleDownload = () => {
        const element = document.createElement('a');
        const file = new Blob([sql], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'output.sql';
        document.body.appendChild(element);
        element.click();
        alert('SQL file downloaded successfully');
        element.onerror = () => {
            alert('Failed to download SQL file');
        };
    };

    const generateAndSetSQL = async () => {
        if (csvData) {
            setLoading(true);
            setTimeout(async () => {
                const generatedSql = await generateSQL(csvData);
                setSql(generatedSql);
                setLoading(false);
            }, 1000);
        } else {
            setSql('');
        }
    };
    useEffect(() => {
        generateAndSetSQL();
    }, [csvData]);
    console.log(
        csvData
    )

    return (
        <>
            <button onClick={copyToClipboard} className="mt-5 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">Copy to Clipboard</button>
            <button onClick={handleDownload} className="mt-5 ml-3 px-4 py-2 bg-teal-50 text-teal-500 rounded hover:bg-teal-100">Download SQL</button>
            {csvData && (
                <div className="text-xs mt-5 flex items-center justify-center">
                    {loading ? (
                        <>
                            <LoadingComponent />
                            <span className="align-middle">Converting... less than a second elapsed</span>
                        </>
                    ) : (
                        <>
                            <span className="icon w-4 mr-2 ">
                                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m504 256c0 136.967-111.033 248-248 248s-248-111.033-248-248 111.033-248 248-248 248 111.033 248 248zm-276.686 131.314 184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0l-150.059 150.058-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
                            </span>
                            <span className="align-middle">Converted successfully</span>
                        </>
                    )}
                </div>
            )}

            <textarea readOnly value={sql} rows={20} cols={50} className='min-h-[380px] bg-primary-50 border-2 border-primary-100 rounded-lg mt-5 w-full p-5' />
        </>
    );
};

export default SqlOutput;
