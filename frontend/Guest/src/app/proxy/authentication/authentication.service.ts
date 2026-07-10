import type { CompleteRegisterationRequestDto, LogoutResponseDto, StartSessionRequestDto, StartSessionResponseDto, VerifyOtpRequestDto, VerifyOtpResponseDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiName = 'Default';
  

  completeRegisteration = (input: CompleteRegisterationRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/authentication/complete-registeration',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  logout = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LogoutResponseDto>({
      method: 'POST',
      url: '/api/app/authentication/logout',
    },
    { apiName: this.apiName,...config });
  

  startSession = (input: StartSessionRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, StartSessionResponseDto>({
      method: 'POST',
      url: '/api/app/authentication/start-session',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  verifyOtp = (input: VerifyOtpRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VerifyOtpResponseDto>({
      method: 'POST',
      url: '/api/app/authentication/verify-otp',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
