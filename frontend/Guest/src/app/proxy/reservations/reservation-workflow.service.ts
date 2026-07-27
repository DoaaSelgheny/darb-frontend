import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { BlobDto } from '../files/models';
import type { RejectPaymentReceiptInput, StartPaymentInput, StartPaymentResultDto, UploadPaymentReceiptInput } from '../payments/models';

@Injectable({
  providedIn: 'root',
})
export class ReservationWorkflowService {
  apiName = 'Default';
  

  approveReservation = (reservationId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/reservation-workflow/approve-reservation/${reservationId}`,
    },
    { apiName: this.apiName,...config });
  

  confirmPaymentReceipt = (reservationId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/reservation-workflow/confirm-payment-receipt/${reservationId}`,
    },
    { apiName: this.apiName,...config });
  

  downloadPaymentReceipt = (reservationId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BlobDto>({
      method: 'POST',
      url: `/api/app/reservation-workflow/download-payment-receipt/${reservationId}`,
    },
    { apiName: this.apiName,...config });
  

  rejectPaymentReceipt = (input: RejectPaymentReceiptInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/reservation-workflow/reject-payment-receipt',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  rejectReservation = (reservationId: number, reason: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/reservation-workflow/reject-reservation/${reservationId}`,
      params: { reason },
    },
    { apiName: this.apiName,...config });
  

  retryPayment = (reservationId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/reservation-workflow/retry-payment/${reservationId}`,
    },
    { apiName: this.apiName,...config });
  

  startPayment = (input: StartPaymentInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, StartPaymentResultDto>({
      method: 'POST',
      url: '/api/app/reservation-workflow/start-payment',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  uploadPaymentReceipt = (input: UploadPaymentReceiptInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, StartPaymentResultDto>({
      method: 'POST',
      url: '/api/app/reservation-workflow/upload-payment-receipt',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  verifyPayment = (reservationId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/reservation-workflow/verify-payment/${reservationId}`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
