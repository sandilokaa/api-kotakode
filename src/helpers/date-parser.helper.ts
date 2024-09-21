import moment from 'moment';

/**
 * @param date
 * @return
 */
export function parseDate(date: Date): string {
  const formattedDate = moment(date).format('YYYY-MM-DD HH:mm');
  return formattedDate;
}
