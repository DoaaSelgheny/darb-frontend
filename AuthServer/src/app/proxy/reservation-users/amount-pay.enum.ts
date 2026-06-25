import { mapEnumToOptions } from '@abp/ng.core';

export enum AmountPay {
  Partial = 1,
  Total = 2,
}

export const amountPayOptions = mapEnumToOptions(AmountPay);
