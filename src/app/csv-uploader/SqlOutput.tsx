import React, { useState, useEffect } from 'react';
import { generateSQL } from '../../utils/sqlGenerator';
import { CsvData } from '../../types';

type SqlOutputProps = {
    csvData: CsvData | null;
};

const SqlOutput: React.FC<SqlOutputProps> = ({ csvData }) => {
    const [sql, setSql] = useState<string>('');

    const copyToClipboard = () => {
        navigator.clipboard.writeText(sql)
            .then(() => alert('SQL copied to clipboard'))
            .catch((error) => console.error('Failed to copy: ', error));
    };

    const handleDownload = () => {
        const element = document.createElement('a');
        const file = new Blob([sql], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = 'output.sql';
        document.body.appendChild(element);
        element.click();
    };

    useEffect(() => {
        setSql(csvData ? generateSQL(csvData) : '');
    }, [csvData]);

    return (
        <>
            <button onClick={copyToClipboard} className="mt-5 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">Copy to Clipboard</button>
            <button onClick={handleDownload} className="mt-5 ml-3 px-4 py-2 bg-teal-50 text-teal-500 rounded hover:bg-teal-100">Download SQL</button>
            <textarea readOnly value={sql} rows={20} cols={50} className='min-h-[380px] bg-primary-50 border-2 border-primary-100 rounded-lg mt-5 w-full p-5'/>
        </>
    );
};

export default SqlOutput;
