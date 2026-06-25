import { mapEnumToOptions } from '@abp/ng.core';

export enum AccountVerificationType {
  Host = 1,
  Guest = 2,
}

export const accountVerificationTypeOptions = mapEnumToOptions(AccountVerificationType);
