export class RegisterModel {
    public sessionId: string;
    public name: string;
    public surname: string;
    public gRecaptchaResponse: string;
    public email?: string;
    public phoneNumber?: string;
    public dialCode?: string;
    public countryCode?: string;
  }