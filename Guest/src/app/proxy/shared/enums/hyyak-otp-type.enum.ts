import { mapEnumToOptions } from '@abp/ng.core';

export enum HyyakOtpType {
  ConfirmPhoneNumber = 1,
  ChangePhoneNumber = 2,
  ConfirmEmail = 3,
  ChangeEmail = 4,
}

export const hyyakOtpTypeOptions = mapEnumToOptions(HyyakOtpType);
