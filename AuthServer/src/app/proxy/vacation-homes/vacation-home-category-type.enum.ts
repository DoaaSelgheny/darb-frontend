import { mapEnumToOptions } from '@abp/ng.core';

export enum VacationHomeCategoryType {
  FamiliesAndSingles = 0,
  Families = 1,
  Singles = 2,
}

export const vacationHomeCategoryTypeOptions = mapEnumToOptions(VacationHomeCategoryType);
