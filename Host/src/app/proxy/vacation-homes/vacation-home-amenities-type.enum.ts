import { mapEnumToOptions } from '@abp/ng.core';

export enum VacationHomeAmenitiesType {
  Primary = 0,
  Secondary = 1,
}

export const vacationHomeAmenitiesTypeOptions = mapEnumToOptions(VacationHomeAmenitiesType);
