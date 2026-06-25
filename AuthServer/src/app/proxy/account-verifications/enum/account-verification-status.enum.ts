import { mapEnumToOptions } from '@abp/ng.core';

export enum AccountVerificationStatus {
  Draft = 1,
  UnderStudy = 2,
  Approved = 3,
  Reject = 4,
}

export const accountVerificationStatusOptions = mapEnumToOptions(AccountVerificationStatus);
