import { mapEnumToOptions } from '@abp/ng.core';

export enum Action {
  Approve = 1,
  Reject = 2,
}

export const actionOptions = mapEnumToOptions(Action);
