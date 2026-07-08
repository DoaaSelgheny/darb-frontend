import { mapEnumToOptions } from '@abp/ng.core';

export enum RejectionType {
  UnclearIdentityDocument = 1,
  Other = 2,
}

export const rejectionTypeOptions = mapEnumToOptions(RejectionType);
