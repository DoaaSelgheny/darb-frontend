import type { OtpDeliveryResult } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OtpDeliveryService {
  apiName = 'Default';
  

  sendOtpViaWhatsApp = (phoneNumber: string, otpCode: string, cancellationToken?: any, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OtpDeliveryResult>({
      method: 'POST',
      url: '/api/app/otp-delivery/send-otp-via-whats-app',
      params: { phoneNumber, otpCode },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
