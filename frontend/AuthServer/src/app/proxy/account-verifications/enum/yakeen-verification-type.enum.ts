import { mapEnumToOptions } from '@abp/ng.core';

export enum YakeenVerificationType {
  SaudiId = 1,
  Iqama = 2,
  Passport = 3,
}

export const yakeenVerificationTypeOptions = mapEnumToOptions(YakeenVerificationType);
