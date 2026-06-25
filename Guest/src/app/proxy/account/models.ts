import type { LoginMethod } from './login-method.enum';

export interface GenerateOtpRequestDto {
  loginMethod: LoginMethod;
  email?: string;
  phoneNumber?: string;
  dialCode?: string;
  countryCode?: string;
  fullPhoneNumber?: string;
}

export interface GenerateOtpResponseDto {
  message?: string;
  otpCode?: string;
}

export interface RegisterRequestDto {
  loginMethod: LoginMethod;
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  countryCode?: string;
  dialCode?: string;
  fullPhoneNumber?: string;
}

export interface AccessTokenDto {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  id_token?: string;
  refresh_token?: string;
}
