import { mapEnumToOptions } from '@abp/ng.core';

export enum VacationHomeTypeDisplayCategory {
  Residential = 1,
  Recreational = 2,
}

export const vacationHomeTypeDisplayCategoryOptions = mapEnumToOptions(VacationHomeTypeDisplayCategory);
