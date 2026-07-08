import { mapEnumToOptions } from '@abp/ng.core';

export enum AccountVerificationStatus {
  UnderStudy = 1,
  Approved = 2,
  Reject = 3,
}

export const accountVerificationStatusOptions = mapEnumToOptions(AccountVerificationStatus);
