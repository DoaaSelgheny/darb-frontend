import { mapEnumToOptions } from '@abp/ng.core';

export enum IdentityDocumentType {
  Passport = 1,
  Id = 2,
  PersonalRegistryExtract = 3,
}

export const identityDocumentTypeOptions = mapEnumToOptions(IdentityDocumentType);
