import { mapEnumToOptions } from '@abp/ng.core';

export enum Gender {
  Female = 0,
  Male = 1,
}

export const genderOptions = mapEnumToOptions(Gender);
