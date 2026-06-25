import type { LoginModel, RegisterGuestHostModelRequest, VerifyOtpDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  apiName = 'Default';
  

  getOtpBySessionId = (sessionId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/api/Security/GetOtp/${sessionId}`,
    },
    { apiName: this.apiName,...config });
  

  loginGuestByLoginModel = (loginModel: LoginModel, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/Security/LoginGuest',
      body: loginModel,
    },
    { apiName: this.apiName,...config });
  

  loginHostByLoginModel = (loginModel: LoginModel, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/Security/LoginHost',
      body: loginModel,
    },
    { apiName: this.apiName,...config });
  

  registerGuest = (request: RegisterGuestHostModelRequest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/Security/RegisterGuest',
      body: request,
    },
    { apiName: this.apiName,...config });
  

  registerHost = (request: RegisterGuestHostModelRequest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/Security/RegisterHost',
      body: request,
    },
    { apiName: this.apiName,...config });
  

  test = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, Record<string, string>>({
      method: 'GET',
      url: '/api/Security/TestCookies',
    },
    { apiName: this.apiName,...config });
  

  verifyOtp = (dto: VerifyOtpDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/Security/VerifyOtp',
      body: dto,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
