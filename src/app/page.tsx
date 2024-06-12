"use client";
import React, { useState } from 'react';
import CsvUploader from '../component/csv-uploader/CsvUploader';
import SqlOutput from '../component/csv-uploader/SqlOutput';
import { CsvData } from '../lib';

export default function Home() {
  const [csvData, setCsvData] = useState<CsvData | null>(null);

  const handleCsvData = (data: CsvData) => {
    setCsvData(data);
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-center w-9/12">
        <div className="py-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-teal-600 mb-3">
            Convert NEM12 to SQL
          </h1>
          <h2 className="text-slate-500 text-md">
            Add your NEM12 CSV data and automatically convert it to a SQL insert file.
          </h2>
        </div>
        <CsvUploader onCsvData={handleCsvData} />
        <SqlOutput csvData={csvData}/>
      </div>

    </main>
  );
}
