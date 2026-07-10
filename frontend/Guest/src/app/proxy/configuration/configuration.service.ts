import type { OtpResponse } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { HyyakOtpType } from '../shared/enums/hyyak-otp-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  apiName = 'Default';
  

  isAllowSwitchToHost = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'GET',
      url: '/api/app/configuration/is-allow-switch-to-host',
    },
    { apiName: this.apiName,...config });
  

  sendOtp = (otpType: HyyakOtpType, contactInfo: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OtpResponse>({
      method: 'GET',
      url: '/api/app/configuration/send-otp',
      params: { otpType, contactInfo },
    },
    { apiName: this.apiName,...config });
  

  verifyOtpByOtpTypeAndToken = (otpType: HyyakOtpType, token: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'GET',
      url: '/api/app/configuration/vrify-otp',
      params: { otpType, token },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
