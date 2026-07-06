import { mapEnumToOptions } from '@abp/ng.core';

export enum GuestPublishStatus {
  Empty = 0,
  UnPublish = 1,
  Publish = 2,
}

export const guestPublishStatusOptions = mapEnumToOptions(GuestPublishStatus);
