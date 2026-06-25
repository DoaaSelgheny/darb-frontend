import { mapEnumToOptions } from '@abp/ng.core';

export enum ReceptionTimeType {
  MiddleWeek = 1,
  Weekend = 2,
  AllDaysWeek = 3,
}

export const receptionTimeTypeOptions = mapEnumToOptions(ReceptionTimeType);
