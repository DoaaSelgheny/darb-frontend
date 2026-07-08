
export interface LoginModel {
  returnUrl?: string;
  recaptchaResponse: string;
  loginMethod?: string;
  email?: string;
  phoneNumber?: string;
  dialCode?: string;
  countryCode?: string;
  fullPhoneNumber?: string;
}

export interface RegisterGuestHostModelRequest {
  sessionId: string;
  name: string;
  surname: string;
  email?: string;
  phoneNumber?: string;
  dialCode?: string;
  countryCode?: string;
  fullPhoneNumber?: string;
  gRecaptchaResponse: string;
}

export interface VerifyOtpDto {
  sessionId: string;
  token: string;
}
