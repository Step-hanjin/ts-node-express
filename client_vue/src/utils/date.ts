import dayjs from 'dayjs';

export const getCurrentDate = (format: string): string => {
    return dayjs().format(format);
}