import { mapEnumToOptions } from '@abp/ng.core';

export enum YakeenVerificationType {
  SaudiId = 1,
  Iqama = 2,
  Passport = 3,
}

// export const yakeenVerificationTypeOptions = mapEnumToOptions(YakeenVerificationType);

export const yakeenVerificationTypeOptions = mapEnumToOptions(YakeenVerificationType).map(option => ({
  ...option,
  key: `::${option.key}` // Prefix with '::' to use it as a localization key
}));