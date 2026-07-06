import { mapEnumToOptions } from '@abp/ng.core';

export enum ReservationType {
  All = 0,
  VacationHome = 1,
  Experience = 2,
}

export const reservationTypeOptions = mapEnumToOptions(ReservationType);
