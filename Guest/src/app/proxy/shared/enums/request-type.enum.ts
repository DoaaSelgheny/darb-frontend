import { mapEnumToOptions } from '@abp/ng.core';

export enum RequestType {
  AddNewHomeVacation = 1,
  UpdateHomeVacation = 2,
  AddNewExperiences = 3,
  UpdateExperiences = 4,
}

export const requestTypeOptions = mapEnumToOptions(RequestType);
