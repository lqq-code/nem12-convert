export const formatTimestamp = (date: string, interval: number, index: number): string => {
    const [year, month, day] = [date.slice(0, 4), date.slice(4, 6), date.slice(6, 8)];
    const [hour, minute] = calculateHourAndMinute(interval, index);
    return `${year}-${month}-${day} ${hour}:${minute}`;
};

const calculateHourAndMinute = (interval: number, index: number): [string, string] => {
    const hour = String(Math.floor(index * interval / 60)).padStart(2, '0');
    const minute = String((index * interval) % 60).padStart(2, '0');
    return [hour, minute];
};