import { formatTimestamp } from './formatTime';

interface DataLine {
    [key: string]: string | number | string[];
}

enum RecordType {
    NMI_DETAILS = 200,
    INTERVAL_DATA = 300,
    END_OF_DATA = 900
}

export const generateSQL = (data: DataLine[]): string => {
    let sqlStatements = '';
    let currentNmi: string | null = null;
    let currentInterval: number = -1;
    for (const line of data) {
        const recordIndicator = parseInt(line[100 as keyof DataLine] as string, 10);

        switch (recordIndicator) {
            case RecordType.NMI_DETAILS:
                currentNmi = line['NEM12'] as string;
                currentInterval = parseInt((line['__parsed_extra'] as string[])[3] as string, 10);
                break;

            case RecordType.INTERVAL_DATA:
                if (currentNmi && currentInterval !== -1) {
                    const currentDate = line['NEM12'] as string;
                    const consumptionValues = (line['__parsed_extra'] as string[]).map(value => parseFloat(value));

                    consumptionValues.forEach((consumption, index) => {
                        const timestamp = formatTimestamp(currentDate, currentInterval, index);
                        const sql = `INSERT INTO meter_readings (nmi, timestamp, consumption) VALUES ('${currentNmi}', '${timestamp}', ${consumption});\n`;
                        sqlStatements += sql;
                    });
                }
                break;

            case RecordType.END_OF_DATA:
                break;

            default:
                break;
        }
    }

    return sqlStatements;
};
