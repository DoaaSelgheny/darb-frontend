import type { GetRelatedVacationHomesInputForGuest, GetVacationHomeAvailability, GetVacationHomeCheckOutResponseDto, GetVacationHomeDetailsForGuestRequestDto, GetVacationHomeDetailsForGuestResponseDto, GetVacationHomeListItemForGuestDto, GetVacationHomesInputForGuest, VacationHomeWithNavigationPropertiesDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CityDto } from '../cities/models';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';
import type { CreatePaymentDto, CreatePaymentResultDto, GetReservationStatus, PrimaryPaymentDto } from '../payments/models';
import type { LookupDto, LookupRequestDto } from '../shared/models';
import type { VacationHomeTypeDto, VacationHomeTypeLookupDto } from '../vacation-home-types/models';

@Injectable({
  providedIn: 'root',
})
export class VacationHomeGuestService {
  apiName = 'Default';
  

  checkForAvailabilityByInput = (input: GetVacationHomeAvailability, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'GET',
      url: '/api/app/vacation-home-guests/check-for-availability',
      params: { vacationHomeId: input.vacationHomeId, dateFrom: input.dateFrom, dateTo: input.dateTo },
    },
    { apiName: this.apiName,...config });
  

  getCityLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CityDto[]>({
      method: 'GET',
      url: '/api/app/vacation-home-guests/city-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getDetails = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetVacationHomeDetailsForGuestResponseDto>({
      method: 'GET',
      url: `/api/app/vacation-home-guests/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetVacationHomesInputForGuest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<VacationHomeWithNavigationPropertiesDto>>({
      method: 'GET',
      url: '/api/app/vacation-home-guests',
      params: { filterText: input.filterText, priceFrom: input.priceFrom, priceTo: input.priceTo, cityId: input.cityId, vacationHomeTypeId: input.vacationHomeTypeId, cityIds: input.cityIds, vacationHomeTypeIds: input.vacationHomeTypeIds, dateFrom: input.dateFrom, dateTo: input.dateTo, showOnHome: input.showOnHome, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getPaymentByInput = (input: GetVacationHomeAvailability, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PrimaryPaymentDto>({
      method: 'GET',
      url: '/api/app/vacation-home-guests/payment',
      params: { vacationHomeId: input.vacationHomeId, dateFrom: input.dateFrom, dateTo: input.dateTo },
    },
    { apiName: this.apiName,...config });
  

  getRelatedVacationHomesPaginated = (input: GetRelatedVacationHomesInputForGuest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<GetVacationHomeListItemForGuestDto>>({
      method: 'GET',
      url: '/api/app/vacation-home-guests/related-vacation-homes/paginated',
      params: { vacationHomeId: input.vacationHomeId, cityId: input.cityId, vacationHomeTypeId: input.vacationHomeTypeId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getReservedDatesByVacationHomeId = (vacationHomeId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string[]>({
      method: 'GET',
      url: `/api/app/vacation-home-guests/get-reserved-dates/${vacationHomeId}`,
    },
    { apiName: this.apiName,...config });
  

  getUsedTypes = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeTypeLookupDto[]>({
      method: 'GET',
      url: '/api/app/vacation-home-guests/get-used-types',
    },
    { apiName: this.apiName,...config });
  

  getVacationHomeCheckOut = (id: number, input: GetVacationHomeDetailsForGuestRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetVacationHomeCheckOutResponseDto>({
      method: 'GET',
      url: `/api/app/vacation-home-guests/${id}/check-out`,
      params: { dateFrom: input.dateFrom, dateTo: input.dateTo },
    },
    { apiName: this.apiName,...config });
  

  getVacationHomeTypeLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto<number>>({
      method: 'GET',
      url: '/api/app/vacation-home-guests/vacation-home-types-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getVacationHomeTypes = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeTypeDto[]>({
      method: 'GET',
      url: '/api/app/vacation-home-guests/vacation-home-types',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getVacationHomeTypesPaginated = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<VacationHomeTypeDto>>({
      method: 'GET',
      url: '/api/app/vacation-home-guests/vacation-home-types/paginated',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  paymentByInput = (input: CreatePaymentDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CreatePaymentResultDto>({
      method: 'POST',
      url: '/api/app/vacation-home-guests/payment',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  reserve = (reservation: string, status: GetReservationStatus, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/app/vacation-home-guests/reserve',
      params: { reservation },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
