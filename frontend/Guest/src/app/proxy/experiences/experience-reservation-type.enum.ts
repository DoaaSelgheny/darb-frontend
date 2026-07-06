import { mapEnumToOptions } from '@abp/ng.core';

export enum ExperienceReservationType {
  Single = 0,
  Group = 1,
}

export const experienceReservationTypeOptions = mapEnumToOptions(ExperienceReservationType);
