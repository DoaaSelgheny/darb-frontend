import { mapEnumToOptions } from '@abp/ng.core';

export enum ServiceType {
  VacationHome = 1,
  Experience = 2,
}

export const serviceTypeOptions = mapEnumToOptions(ServiceType);
