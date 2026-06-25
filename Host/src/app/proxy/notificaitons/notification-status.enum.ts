import { mapEnumToOptions } from '@abp/ng.core';

export enum NotificationStatus {
  Pending = 0,
  Succeeded = 1,
  Failed = 2,
}

export const notificationStatusOptions = mapEnumToOptions(NotificationStatus);
