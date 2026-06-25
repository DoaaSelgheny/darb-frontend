import { mapEnumToOptions } from '@abp/ng.core';

export enum HostPublishStatus {
  Empty = 0,
  UnPublish = 1,
  Publish = 2,
}

export const hostPublishStatusOptions = mapEnumToOptions(HostPublishStatus);
