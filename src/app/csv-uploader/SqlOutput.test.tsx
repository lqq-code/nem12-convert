import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SqlOutput from './SqlOutput';
import '@testing-library/jest-dom';

jest.mock('../../utils/sqlGenerator', () => ({
    generateSQL: jest.fn(() => Promise.resolve('INSERT INTO table_name VALUES ...')),
}));

const csvData: Record<string, string>[] = [
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

// Mock createObjectURL manually
const mockCreateObjectURL = jest.fn();
URL.createObjectURL = mockCreateObjectURL;
URL.revokeObjectURL = mockCreateObjectURL;

describe('SqlOutput component', () => {
    it('renders SQL output correctly', async () => {

        render(<SqlOutput csvData={csvData} />);

        const copyButton = screen.getByText('Copy to Clipboard');
        expect(copyButton).toBeInTheDocument();

        const downloadButton = screen.getByText('Download SQL');
        expect(downloadButton).toBeInTheDocument();
    });

    it('handles downloading SQL', async () => {
        render(<SqlOutput csvData={csvData} />);

        await waitFor(() => expect(screen.getByText('Converted successfully')).toBeInTheDocument());

        const createObjectURLSpy = jest.spyOn(URL, 'createObjectURL');
        const revokeObjectURLSpy = jest.spyOn(URL, 'revokeObjectURL');

        const downloadButton = screen.getByText('Download SQL');
        fireEvent.click(downloadButton);

        await waitFor(() => {
            expect(createObjectURLSpy).toHaveBeenCalled();
            expect(revokeObjectURLSpy).toHaveBeenCalled();
        });
    });

    it('shows loading state while converting', async () => {
        render(<SqlOutput csvData={csvData} />);

        const loadingText = await waitFor(() => screen.getByText('Converting... less than a second elapsed'));
        expect(loadingText).toBeInTheDocument();

        const successText = await waitFor(() => screen.getByText('Converted successfully'));
        expect(successText).toBeInTheDocument();
    });
});
