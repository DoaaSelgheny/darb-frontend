import type { LoginMethod } from '../account/login-method.enum';
import type { AccessTokenDto } from '../account/models';

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
