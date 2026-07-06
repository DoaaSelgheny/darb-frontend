import { mapEnumToOptions } from '@abp/ng.core';

export enum HostType {
  Individual = 0,
  Company = 1,
}

export const hostTypeOptions = mapEnumToOptions(HostType);
