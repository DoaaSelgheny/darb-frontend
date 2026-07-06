import { mapEnumToOptions } from '@abp/ng.core';

export enum TransferStatus {
  Pending = 0,
  Coming = 1,
  Executed = 2,
  Fail = 3,
}

export const transferStatusOptions = mapEnumToOptions(TransferStatus);
