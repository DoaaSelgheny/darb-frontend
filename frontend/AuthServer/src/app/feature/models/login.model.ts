export class LoginModel {
  public recaptchaResponse: string;
  public loginMethod: string;
  public email: string;
  public phoneNumber: string;
  public dialCode: string;
  public countryCode: string;
}

export class verifyModel {
  public sessionId: string;
  public token: string;
}
