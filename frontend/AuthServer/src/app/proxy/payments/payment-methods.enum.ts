import { mapEnumToOptions } from '@abp/ng.core';

export enum PaymentMethods {
  Credit = 1,
  ApplePay = 2,
  Settlement = 3,
}

export const paymentMethodsOptions = mapEnumToOptions(PaymentMethods);
