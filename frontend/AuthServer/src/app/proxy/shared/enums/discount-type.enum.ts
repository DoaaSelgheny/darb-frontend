import { mapEnumToOptions } from '@abp/ng.core';

export enum DiscountType {
  FixedValue = 1,
  Percentage = 2,
}

export const discountTypeOptions = mapEnumToOptions(DiscountType);
