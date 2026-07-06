import type { ExtensibleObject } from '@abp/ng.core';
import type { ProfilePictureType } from './profile-picture-type.enum';
import type { IRemoteStreamContent } from '../content/models';

export interface ProfileDto extends ExtensibleObject {
  userName?: string;
  email?: string;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  isExternal: boolean;
  hasPassword: boolean;
  concurrencyStamp?: string;
}

export interface ProfilePictureInput {
  type: ProfilePictureType;
  imageContent: IRemoteStreamContent;
}

export interface ProfilePictureSourceDto {
  type: ProfilePictureType;
  source?: string;
}

export interface RegisterDto extends ExtensibleObject {
  userName: string;
  emailAddress: string;
  password: string;
  appName: string;
}

export interface ResetPasswordDto {
  userId?: string;
  resetToken: string;
  password: string;
}

export interface SendPasswordResetCodeDto {
  email: string;
  appName: string;
  returnUrl?: string;
  returnUrlHash?: string;
}

export interface VerifyPasswordResetTokenInput {
  userId?: string;
  resetToken: string;
}
