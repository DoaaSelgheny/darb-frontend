import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { TaxInvoiceDetailsDto } from '../models';
import type { HostCommissionInvoiceDetailsDto } from '../reservations/guest/models';

@Injectable({
  providedIn: 'root',
})
export class InvoiceHostService {
  apiName = 'Default';
  

  getInvoiceDetailsByReservationId = (reservationId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HostCommissionInvoiceDetailsDto>({
      method: 'GET',
      url: `/api/app/invoice-host/invoice-details/${reservationId}`,
    },
    { apiName: this.apiName,...config });
  

  getValueAddedTaxInvoiceDetailsByReservationId = (reservationId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TaxInvoiceDetailsDto>({
      method: 'GET',
      url: `/api/app/invoice-host/value-added-tax-invoice-details/${reservationId}`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
