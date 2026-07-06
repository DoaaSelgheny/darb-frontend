import { mapEnumToOptions } from '@abp/ng.core';

export enum ExperienceDatesType {
  Specific = 1,
  Scheduled = 2,
}

export const experienceDatesTypeOptions = mapEnumToOptions(ExperienceDatesType);
