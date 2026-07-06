import { mapEnumToOptions } from '@abp/ng.core';

export enum LoginMethod {
  MobilePhone = 1,
  Email = 2,
}

export const loginMethodOptions = mapEnumToOptions(LoginMethod);
