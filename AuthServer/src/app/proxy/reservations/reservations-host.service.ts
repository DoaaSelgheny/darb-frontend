import type { ReservationHostDto, ReservationHostExcelDownloadDto, ReservationHostTransactionDto, ReservationTransactionStatisticDto, ToggleDayAvailabilityDto, VacationHomeCalendarDto, VacationHomeCalendarFilterDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { HostExperienceReservationDetailsDto } from '../admins/experiences/models';
import type { HostVacationHomeReservationDetailsDto } from '../hosts/models';
import type { ReservationsHostFilter } from '../reservation/models';
import type { DownloadTokenResultDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ReservationsHostService {
  apiName = 'Default';
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/reservations-host/download-token',
    },
    { apiName: this.apiName,...config });
  

  getExperienceReservationDetailsById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HostExperienceReservationDetailsDto>({
      method: 'GET',
      url: `/api/app/reservations-host/${id}/experience-reservation-details`,
    },
    { apiName: this.apiName,...config });
  

  getFinancialTransitionListByFilter = (filter: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ReservationHostTransactionDto>>({
      method: 'GET',
      url: '/api/app/reservations-host/financial-transition-list',
      params: { sorting: filter.sorting, skipCount: filter.skipCount, maxResultCount: filter.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getFinancialTransitionStatistic = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ReservationTransactionStatisticDto>({
      method: 'GET',
      url: '/api/app/reservations-host/financial-transition-statistic',
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: ReservationHostExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/reservations-host/as-excel-file',
      params: { downloadToken: input.downloadToken, reservationStatus: input.reservationStatus, filterText: input.filterText },
    },
    { apiName: this.apiName,...config });
  

  getReservationListByFilter = (filter: ReservationsHostFilter, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ReservationHostDto>>({
      method: 'GET',
      url: '/api/app/reservations-host/reservation-list',
      params: { reservationStatus: filter.reservationStatus, filterText: filter.filterText, sorting: filter.sorting, skipCount: filter.skipCount, maxResultCount: filter.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getVacationHomeCalendarByFilter = (filter: VacationHomeCalendarFilterDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeCalendarDto>({
      method: 'GET',
      url: '/api/app/reservations-host/vacation-home-calendar',
      params: { vacationHomeId: filter.vacationHomeId, syncCalendarId: filter.syncCalendarId },
    },
    { apiName: this.apiName,...config });
  

  getVacationHomeReservationDetailsById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HostVacationHomeReservationDetailsDto>({
      method: 'GET',
      url: `/api/app/reservations-host/${id}/vacation-home-reservation-details`,
    },
    { apiName: this.apiName,...config });
  

  toggleDayAvailabilityByRequest = (request: ToggleDayAvailabilityDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/reservations-host/toggle-day-availability',
      body: request,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
