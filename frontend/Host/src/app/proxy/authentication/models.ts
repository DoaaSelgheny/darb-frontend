import type { LoginMethod } from '../account/login-method.enum';
import type { UserType } from '../shared/enums/user-type.enum';
import type { AccessTokenDto } from '../account/models';

export interface CompleteRegisterationRequestDto {
  sessionId?: string;
  key?: string;
  name?: string;
  surname?: string;
  email?: string;
  phoneNumber?: string;
}

export interface LogoutResponseDto {
  success: boolean;
}

export interface StartSessionRequestDto {
  email?: string;
  phoneNumber?: string;
  loginMethod: LoginMethod;
  userType: UserType;
}

export interface StartSessionResponseDto {
  sessionId?: string;
  otp?: string;
  isNewUser: boolean;
}

export interface VerifyOtpRequestDto {
  sessionId: string;
  otp: string;
}

export interface VerifyOtpResponseDto {
  tokenKey?: string;
  isNewUser: boolean;
  userType: UserType;
}

export interface CheckOtpRequestDto {
  loginMethod: LoginMethod;
  email?: string;
  phoneNumber?: string;
  dialCode?: string;
  countryCode?: string;
  fullPhoneNumber?: string;
  otpCode: string;
}

export interface CheckOtpResponseDto {
  message?: string;
  isNew: boolean;
  accessToken: AccessTokenDto;
}
