import { mapEnumToOptions } from '@abp/ng.core';

export enum DayAvailabilityStatus {
  Free = 1,
  Occupied = 2,
}

export const dayAvailabilityStatusOptions = mapEnumToOptions(DayAvailabilityStatus);
