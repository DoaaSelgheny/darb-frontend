import { mapEnumToOptions } from '@abp/ng.core';

export enum VacationHomePublishStatus {
  Published = 0,
  UnPublished = 1,
}

export const vacationHomePublishStatusOptions = mapEnumToOptions(VacationHomePublishStatus);
