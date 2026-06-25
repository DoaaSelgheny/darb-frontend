import { mapEnumToOptions } from '@abp/ng.core';

export enum VisibleStatus {
  All = 1,
  Active = 2,
  InActive = 3,
}

export const visibleStatusOptions = mapEnumToOptions(VisibleStatus);
