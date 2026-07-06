import { mapEnumToOptions } from '@abp/ng.core';

export enum DateType {
  Gregorian = 0,
  Hijri = 1,
}

export const dateTypeOptions = mapEnumToOptions(DateType);
