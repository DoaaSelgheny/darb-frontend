import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { GuestInvoiceDetailsDto } from '../reservations/guest/models';

@Injectable({
  providedIn: 'root',
})
export class InvoicesGuestService {
  apiName = 'Default';
  

  getInvoiceDetailsByReservationId = (reservationId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GuestInvoiceDetailsDto>({
      method: 'GET',
      url: `/api/app/invoices-guest/invoice-details/${reservationId}`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
