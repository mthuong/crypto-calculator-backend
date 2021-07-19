import { environment } from '@env/environment';
import { startOfMonth, endOfMonth } from 'date-fns';
import { format, utcToZonedTime } from 'date-fns-tz';

// return date string with format f
export const toDateStr = (
  date: Date | string,
  f: string = 'yyyy-MM-dd HH:mm:ss.SSS',
): string => {
  return format(new Date(date), f, { timeZone: environment.timeZone });
};

export const toDateUTCStr = (
  date: Date | string,
  f: string = 'yyyy-MM-dd HH:mm:ss.SSS',
): string => {
  const tz = 'utc';

  return format(utcToZonedTime(date, tz), f, { timeZone: tz });
};

// get date start of month with format f
export const toStartOfMonth = (
  date: Date | string,
  f: string = 'yyyy-MM-dd HH:mm:ss.SSS',
): string => {
  return toDateStr(startOfMonth(new Date(date)), f);
};

// get date end of month with format f
export const toEndOfMonth = (
  date: Date | string,
  f: string = 'yyyy-MM-dd HH:mm:ss.SSS',
): string => {
  return toDateStr(endOfMonth(new Date(date)), f);
};
