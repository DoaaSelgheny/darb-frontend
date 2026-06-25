import { mapEnumToOptions } from '@abp/ng.core';

export enum OtpType {
  ChangePhoneNumber = 1,
}

export const otpTypeOptions = mapEnumToOptions(OtpType);
