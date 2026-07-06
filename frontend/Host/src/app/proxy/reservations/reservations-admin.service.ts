import type { FinancialTransactionRequestDto } from './admin/models';
import type { ReservationAdminDto, ReservationAdminTransactionDto, ReservationHostExcelDownloadDto, ReservationTransactionStatisticDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { AdminExperienceReservationDetailsDto } from '../admins/experiences/models';
import type { AdminVacationHomeReservationDetailsDto } from '../admins/models';
import type { ReservationsHostFilter } from '../reservation/models';
import type { DownloadTokenResultDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ReservationsAdminService {
  apiName = 'Default';
  

  changeTransferStatusById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: `/api/app/reservations-admin/${id}/change-transfer-status`,
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/reservations-admin/download-token',
    },
    { apiName: this.apiName,...config });
  

  getExperienceReservationDetailsById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AdminExperienceReservationDetailsDto>({
      method: 'GET',
      url: `/api/app/reservations-admin/${id}/experience-reservation-details`,
    },
    { apiName: this.apiName,...config });
  

  getFinancialTransitionListByFilter = (filter: FinancialTransactionRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ReservationAdminTransactionDto>>({
      method: 'GET',
      url: '/api/app/reservations-admin/financial-transition-list',
      params: { reservationStatus: filter.reservationStatus, transferStatus: filter.transferStatus, filterText: filter.filterText, sorting: filter.sorting, skipCount: filter.skipCount, maxResultCount: filter.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getFinancialTransitionStatistic = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ReservationTransactionStatisticDto>({
      method: 'GET',
      url: '/api/app/reservations-admin/financial-transition-statistic',
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: ReservationHostExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/reservations-admin/as-excel-file',
      params: { downloadToken: input.downloadToken, reservationStatus: input.reservationStatus, filterText: input.filterText },
    },
    { apiName: this.apiName,...config });
  

  getReservationListByFilter = (filter: ReservationsHostFilter, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ReservationAdminDto>>({
      method: 'GET',
      url: '/api/app/reservations-admin/reservation-list',
      params: { reservationStatus: filter.reservationStatus, filterText: filter.filterText, sorting: filter.sorting, skipCount: filter.skipCount, maxResultCount: filter.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getReservationTransactionListAsExcelFile = (token: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/reservations-admin/reservation-transaction-list-as-excel-file',
      params: { token },
    },
    { apiName: this.apiName,...config });
  

  getVacationHomeReservationDetailsById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AdminVacationHomeReservationDetailsDto>({
      method: 'GET',
      url: `/api/app/reservations-admin/${id}/vacation-home-reservation-details`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
