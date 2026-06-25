import { mapEnumToOptions } from '@abp/ng.core';

export enum ExperienceStatus {
  UnderReview = 0,
  Rejected = 1,
  Published = 2,
  UnComplete = 4,
  WaitingModificationToCompleted = 5,
}

export const experienceStatusOptions = mapEnumToOptions(ExperienceStatus);
