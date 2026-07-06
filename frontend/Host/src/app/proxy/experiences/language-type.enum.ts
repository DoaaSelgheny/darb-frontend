import { mapEnumToOptions } from '@abp/ng.core';

export enum LanguageType {
  Ar = 0,
  En = 1,
  Both = 2,
}

export const languageTypeOptions = mapEnumToOptions(LanguageType);
