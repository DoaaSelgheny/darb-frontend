import { mapEnumToOptions } from '@abp/ng.core';

export enum RejectionType {
  IncorrectBankInformation = 1,
  MismatchIBANCertificationWithBank = 2,
  IBANCertificateNotClear = 3,
  MinistryOfTourismLicenseNoClear = 4,
  Other = 5,
}

export const rejectionTypeOptions = mapEnumToOptions(RejectionType);
