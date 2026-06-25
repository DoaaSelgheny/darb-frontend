import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class ApplePayService {
  apiName = 'Default';
  

  html = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: '/apple-pay.html',
    },
    { apiName: this.apiName,...config });
  

  wellKnow = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: '/.well-known/apple-developer-merchantid-domain-association.txt',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
