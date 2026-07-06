import { mapEnumToOptions } from '@abp/ng.core';

export enum PaymentType {
  Visa = 1,
  CreditCard = 2,
  Mada = 3,
  Stcpay = 4,
  Applepay5 = 5,
  TamaraSettlement = 6,
}

export const paymentTypeOptions = mapEnumToOptions(PaymentType);
