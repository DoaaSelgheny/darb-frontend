import { mapEnumToOptions } from '@abp/ng.core';

export enum PaymentType {
  Visa = 1,
  ShamBank = 7,
}

export const paymentTypeOptions = mapEnumToOptions(PaymentType);
