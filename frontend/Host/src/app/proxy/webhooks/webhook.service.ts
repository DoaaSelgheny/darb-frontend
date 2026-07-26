import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { WebhookPayload } from '../hayyak/integrations/tamara/contracts/webhook/models';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class WebhookService {
  apiName = 'Default';
  

  moyasar = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/app/webhook/moyasar',
    },
    { apiName: this.apiName,...config });
  

  moyasarReturn = (reservationId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: '/api/app/webhook/moyasar-return',
      params: { reservationId },
    },
    { apiName: this.apiName,...config });
  

  tamara = (input: WebhookPayload, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/app/webhook/tamara',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
