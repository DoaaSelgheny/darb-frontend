import { mapEnumToOptions } from '@abp/ng.core';

export enum ProfilePictureType {
  Image = 0,
  Gravatar = 1,
  None = 2,
}

export const profilePictureTypeOptions = mapEnumToOptions(ProfilePictureType);
