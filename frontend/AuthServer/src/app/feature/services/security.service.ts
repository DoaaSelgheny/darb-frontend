import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { LoginModel, verifyModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  apiName = 'Security';

  loginGuest = (input: LoginModel, config?: Partial<Rest.Config>) =>
    this.restService.request<LoginModel, any>(
      {
        method: 'POST',
        url: '/api/Security/LoginGuest',
        body: input,
      },
      { apiName: 'LoginGuest', ...config },
    );
  registerGuest = (input: RegisterModel, config?: Partial<Rest.Config>) =>
    this.restService.request<RegisterModel, any>(
      {
        method: 'POST',
        url: '/api/Security/RegisterGuest',
        body: input,
      },
      { apiName: 'LoginGuest', ...config },
    );

  registerHost = (input: RegisterModel, config?: Partial<Rest.Config>) =>
    this.restService.request<RegisterModel, any>(
      {
        method: 'POST',
        url: '/api/Security/RegisterHost',
        body: input,
      },
      { apiName: 'LoginGuest', ...config },
    );

  loginHost = (input: LoginModel, config?: Partial<Rest.Config>) =>
    this.restService.request<LoginModel, any>(
      {
        method: 'POST',
        url: '/api/Security/LoginHost',
        body: input,
      },
      { apiName: 'LoginGuest', ...config },
    );

  getOtp = (config?: Partial<Rest.Config>) =>
    this.restService.request<LoginModel, any>(
      {
        method: 'GET',
        url: '/api/Security/GetOtp/' + localStorage.getItem('loginSession'),
      },
      { apiName: 'GetOtp', ...config },
    );

  verifyOtp = (input: verifyModel, config?: Partial<Rest.Config>) =>
    this.restService.request<verifyModel, any>(
      {
        method: 'POST',
        url: '/api/Security/VerifyOtp',
        body: input,
      },
      { apiName: 'VerifyOtp', ...config },
    );
  constructor(private restService: RestService) { }
}
