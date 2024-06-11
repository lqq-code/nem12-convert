import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CsvUploader from './CsvUploader';
import '@testing-library/jest-dom';

const mockCsvData: Record<string, string>[] = [
    { "100": "200", "NEM12": "NEM1201009", "200506081149": "E1E2", "UNITEDDP": "1", "NEMMCO": "E1" },
    { "100": "300", "NEM12": "20050301", "200506081149": "0", "UNITEDDP": "0", "NEMMCO": "0" },
    { "100": "300", "NEM12": "20050302", "200506081149": "0", "UNITEDDP": "0", "NEMMCO": "0" },
    { "100": "300", "NEM12": "20050303", "200506081149": "0", "UNITEDDP": "0", "NEMMCO": "0" },
    { "100": "300", "NEM12": "20050304", "200506081149": "0", "UNITEDDP": "0", "NEMMCO": "0" },
    { "100": "500", "NEM12": "O", "200506081149": "S01009", "UNITEDDP": "20050310121004", "NEMMCO": "" },
    { "100": "200", "NEM12": "NEM1201009", "200506081149": "E1E2", "UNITEDDP": "2", "NEMMCO": "E2" },
    { "100": "300", "NEM12": "20050301", "200506081149": "0", "UNITEDDP": "0", "NEMMCO": "0" },
    { "100": "300", "NEM12": "20050302", "200506081149": "0", "UNITEDDP": "0", "NEMMCO": "0" },
    { "100": "300", "NEM12": "20050303", "200506081149": "0", "UNITEDDP": "0", "NEMMCO": "0" },
    { "100": "300", "NEM12": "20050304", "200506081149": "0", "UNITEDDP": "0", "NEMMCO": "0" },
    { "100": "500", "NEM12": "O", "200506081149": "S01009", "UNITEDDP": "20050310121004" },
    { "100": "900" }
];
jest.mock('papaparse', () => ({
    parse: jest.fn(),
}));

describe('CsvUploader component', () => {
    it('renders file upload form correctly', () => {
        render(<CsvUploader onCsvData={() => { }} />);

        const dropTarget = screen.getByText(
            'Drag and drop a file here, or click to select'
        );
        expect(dropTarget).toBeInTheDocument();
    });

    it('handles CSV file upload correctly', () => {
        const handleCsvData = jest.fn();

        render(<CsvUploader onCsvData={handleCsvData} />);

        const fileInput = screen.getByText('Drag and drop a file here, or click to select');
        fireEvent.change(fileInput, {
            target: { files: [new File([JSON.stringify(mockCsvData)], 'test.csv', { type: 'text/csv' })] }
        });

        return waitFor(() => {
            expect(screen.queryByText('Converting... less than a second elapsed')).toBeNull();
        });
    });

});
