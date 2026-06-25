import { differenceInCalendarDays } from 'date-fns';
export const EIGHTEEN_YEARS_AGO = new Date().setFullYear(new Date().getFullYear() - 18);
export const disabledDate = (current: Date): boolean => {
  // Can not select days before today and EIGHTEEN_YEARS_AGO
  return differenceInCalendarDays(current, EIGHTEEN_YEARS_AGO) > 0;
};
