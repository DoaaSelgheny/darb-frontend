import { mapEnumToOptions } from '@abp/ng.core';

export enum ExperienceImageType {
  Location = 0,
  Experience = 1,
}

export const experienceImageTypeOptions = mapEnumToOptions(ExperienceImageType);
