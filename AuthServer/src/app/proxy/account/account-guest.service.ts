import type { GenerateOtpRequestDto, GenerateOtpResponseDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CheckOtpRequestDto, CheckOtpResponseDto } from '../authentication/models';

@Injectable({
  providedIn: 'root',
})
export class AccountGuestService {
  apiName = 'Default';
  

  checkOtpLogin = (input: CheckOtpRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CheckOtpResponseDto>({
      method: 'POST',
      url: '/api/app/authentication/checkOTP',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deleteAccount = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/authentication',
    },
    { apiName: this.apiName,...config });
  

  generateLoginOtp = (input: GenerateOtpRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GenerateOtpResponseDto>({
      method: 'POST',
      url: '/api/app/authentication/generateOTP',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
