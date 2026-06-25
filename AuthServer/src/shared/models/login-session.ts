import { LoginMethod } from "@proxy/account";

export interface LoginSession {
  sessionId: string;
  otpCode: string;
  isNewUser: boolean;
  email?: string;
  phoneNumber?: string;
  loginMethod: LoginMethod;
  tokenKey?:string
}
