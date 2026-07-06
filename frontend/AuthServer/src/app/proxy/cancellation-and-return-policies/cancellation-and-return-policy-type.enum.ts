import { mapEnumToOptions } from '@abp/ng.core';

export enum CancellationAndReturnPolicyType {
  Free = 1,
  Flexible = 2,
  Moderate = 3,
  Strict = 4,
}

export const cancellationAndReturnPolicyTypeOptions = mapEnumToOptions(CancellationAndReturnPolicyType);
