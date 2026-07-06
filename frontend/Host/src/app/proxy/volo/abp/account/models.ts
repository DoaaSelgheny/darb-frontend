import type { ExtensibleObject } from '@abp/ng.core';
import type { ProfilePictureType } from './profile-picture-type.enum';

export interface ProfileDto extends ExtensibleObject {
  userName?: string;
  email?: string;
  emailConfirmed: boolean;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  phoneNumberConfirmed: boolean;
  isExternal: boolean;
  hasPassword: boolean;
  supportsMultipleTimezone: boolean;
  timezone?: string;
  concurrencyStamp?: string;
}

export interface ProfilePictureSourceDto {
  type: ProfilePictureType;
  source?: string;
  fileContent: number[];
}
