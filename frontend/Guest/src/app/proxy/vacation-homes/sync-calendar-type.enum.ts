import { mapEnumToOptions } from '@abp/ng.core';

export enum SyncCalendarType {
  Import = 1,
  Export = 2,
}

export const syncCalendarTypeOptions = mapEnumToOptions(SyncCalendarType);
