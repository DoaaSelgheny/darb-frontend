import { mapEnumToOptions } from '@abp/ng.core';

export enum VacationHomeStatus {
  UnderReview = 0,
  Rejected = 1,
  Accepted = 2,
  UnComplete = 3,
  WaitingModificationToCompleted = 4,
}

export const vacationHomeStatusOptions = mapEnumToOptions(VacationHomeStatus);
