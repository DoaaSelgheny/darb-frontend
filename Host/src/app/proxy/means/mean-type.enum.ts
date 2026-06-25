import { mapEnumToOptions } from '@abp/ng.core';

export enum MeanType {
  Experience = 1,
  VacationHome = 2,
}

export const meanTypeOptions = mapEnumToOptions(MeanType);
