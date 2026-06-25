import type { ReservationGuestDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { GuestExperienceReservationDetailsDto } from '../guests/experience-resevations/models';
import type { GuestVacationHomeReservationDetailsDto } from '../guests/vacation-home-resevations/models';
import type { ReservationsGuestFilter } from '../reservation/models';

@Injectable({
  providedIn: 'root',
})
export class ReservationsGuestService {
  apiName = 'Default';
  

  cancelReservationByIdAndRejectionReason = (id: number, rejectionReason: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: `/api/app/reservations-guest/${id}/cancel-reservation`,
      params: { rejectionReason },
    },
    { apiName: this.apiName,...config });
  

  getExperienceReservationDetailsById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GuestExperienceReservationDetailsDto>({
      method: 'GET',
      url: `/api/app/reservations-guest/${id}/experience-reservation-details`,
    },
    { apiName: this.apiName,...config });
  

  getReservationListByFilter = (filter: ReservationsGuestFilter, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ReservationGuestDto>>({
      method: 'GET',
      url: '/api/app/reservations-guest/reservation-list',
      params: { reservationTimeFrame: filter.reservationTimeFrame, sorting: filter.sorting, skipCount: filter.skipCount, maxResultCount: filter.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getVacationHomeReservationDetailsById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GuestVacationHomeReservationDetailsDto>({
      method: 'GET',
      url: `/api/app/reservations-guest/${id}/vacation-home-reservation-details`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
