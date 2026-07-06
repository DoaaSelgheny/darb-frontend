import { mapEnumToOptions } from '@abp/ng.core';

export enum CategoryType {
  VacationHome = 0,
  Experience = 1,
}

export const categoryTypeOptions = mapEnumToOptions(CategoryType);
