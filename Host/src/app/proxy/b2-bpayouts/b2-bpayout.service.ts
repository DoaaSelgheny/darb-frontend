import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class B2BPayoutService {
  apiName = 'Default';
  

  closeBatch = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/b2BPayout/close-batch',
    },
    { apiName: this.apiName,...config });
  

  createBatch = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/b2BPayout/batch',
    },
    { apiName: this.apiName,...config });
  

  getBatch = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'GET',
      url: '/api/app/b2BPayout/batch',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
