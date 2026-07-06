import { mapEnumToOptions } from '@abp/ng.core';

export enum UserType {
  Guest = 1,
  Host = 2,
  Other = 3,
}

export const userTypeOptions = mapEnumToOptions(UserType);
