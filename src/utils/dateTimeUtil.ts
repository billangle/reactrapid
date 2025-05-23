import moment, { Moment } from 'moment-timezone';
import { DateType } from '../ui/date-input-field/DateInputField';

export function convertToLocalTimezone(
  gmtDateStr: any,
  format = 'MM/DD/YYYY, h:mm A z',
) {
  if (gmtDateStr) {
    const gmtDate = moment.utc(gmtDateStr);
    const browserTimeZone = moment.tz.guess();
    // Convert the GMT date to the user's local time zone
    const browserDate = gmtDate.clone().tz(browserTimeZone);
    const formattedDate = browserDate.format(format);
    return formattedDate;
  }
  return '';
}

export function convertToGMT(
  timeToConvertWithTimeZone: Date,
  format = 'MM/DD/YYYY, h:mm A z',
) {
  if (timeToConvertWithTimeZone) {
    const momentDate: Moment = moment(timeToConvertWithTimeZone);
    const gmtDate = momentDate.tz('GMT');
    return gmtDate.format(format);
  }
  return '';
}

export function convertToDateObj(date: string): DateType | undefined {
  if (!date) return;
  const [given_mm, given_dd, given_yyyy] = date.split('/');

  return {
    dd: given_dd ? (given_dd + '').padStart(2, '0') : '',
    mm: given_mm ? (given_mm + '').padStart(2, '0') : '',
    yyyy: given_yyyy ? given_yyyy + '' : '',
  };
}

export function convertToDateString(date: DateType): string {
  return `${date.mm}/${date.dd}/${date.yyyy}`;
}

export function isDateBetween(
  dateStr: string,
  startDate: string,
  endDate: string,
  format = 'MM/DD/YYYY',
): boolean {
  const dateObj = moment(dateStr, format);
  const startDateObj = moment(startDate, format);
  const endDateObj = moment(endDate, format);
  return dateObj.isBetween(startDateObj, endDateObj, undefined, '[]');
}

export function isAfterDate(
  dateStr: string,
  startDate: string,
  format = 'MM/DD/YYYY',
): boolean {
  const dateObj = moment(dateStr, format);
  const startDateObj = moment(startDate, format);
  return dateObj.isAfter(startDateObj);
}
