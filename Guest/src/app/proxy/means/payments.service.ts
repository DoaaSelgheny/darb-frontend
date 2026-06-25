import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateExperiencePaymentDto, CreatePaymentDto, CreatePaymentResultDto, FollowUpTransactionDto, GetReservationStatus } from '../payments/models';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  apiName = 'Default';
  

  createExperiencePayment = (input: CreateExperiencePaymentDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CreatePaymentResultDto>({
      method: 'POST',
      url: '/api/app/payments/experience-payment',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  createPayment = (input: CreatePaymentDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CreatePaymentResultDto>({
      method: 'POST',
      url: '/api/app/payments/payment',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  followUpPaymentByInput = (input: FollowUpTransactionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/payments/follow-up-payment',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  getTransactionByInput = (input: GetReservationStatus, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetReservationStatus>({
      method: 'GET',
      url: '/api/app/payments/transaction',
      params: { acquirerMessage: input.acquirerMessage, acquirerRRN: input.acquirerRRN, cartId: input.cartId, customerEmail: input.customerEmail, respCode: input.respCode, respStatus: input.respStatus, respMessage: input.respMessage, signature: input.signature, token: input.token, tranRef: input.tranRef },
    },
    { apiName: this.apiName,...config });
  

  syncPaymentStatusByPaymentId = (paymentId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CreatePaymentResultDto>({
      method: 'POST',
      url: `/api/app/payments/sync-payment-status/${paymentId}`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
