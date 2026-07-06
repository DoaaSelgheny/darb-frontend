import type { ExperienceWithNavigationPropertiesDto, GeDetailsReservationPricingForGuestDto, GetExperienceAvailability, GetExperienceAvailabilityTimeSlotDto, GetExperienceDetailsForGuestResponseDto, GetExperienceListItemForGuestDto, GetExperiencesInput, GetRelatedExperiencesInputForGuest } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CityDto } from '../cities/models';
import type { ExperienceTypeDto, ExperienceTypeLookupDto } from '../experience-types/models';
import type { BlobDto } from '../files/models';
import type { MeanDto } from '../means/models';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';
import type { CreateExperiencePaymentDto, CreatePaymentResultDto, GetReservationStatus } from '../payments/models';
import type { LookupDto, LookupRequestDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ExperienceGuestService {
  apiName = 'Default';
  

  checkForAvailabilityByInput = (input: GetExperienceAvailability, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'GET',
      url: '/api/app/experiences-guest/check-for-availability',
      params: { experienceId: input.experienceId, adults: input.adults, children: input.children },
    },
    { apiName: this.apiName,...config });
  

  download = (fileName: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/api/app/experiences-guest/download/${fileName}`,
    },
    { apiName: this.apiName,...config });
  

  getAvailiableDatesByExperienceId = (experienceId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string[]>({
      method: 'GET',
      url: `/api/app/experiences-guest/get-availiable-dates/${experienceId}`,
    },
    { apiName: this.apiName,...config });
  

  getCityLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, CityDto[]>({
      method: 'GET',
      url: '/api/app/experiences-guest/city-lookup',
    },
    { apiName: this.apiName,...config });
  

  getDetails = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetExperienceDetailsForGuestResponseDto>({
      method: 'GET',
      url: `/api/app/experiences-guest/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getDetailsReservationPricingForGuestByExperienceIdAndNumberOfPerson = (experienceId: number, numberOfPerson: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GeDetailsReservationPricingForGuestDto>({
      method: 'GET',
      url: '/api/app/experiences-guest/details-reservation-pricing',
      params: { experienceId, numberOfPerson },
    },
    { apiName: this.apiName,...config });
  

  getExperienceAvailabilityDateByFromDateAndToDateAndExperienceId = (fromDate: string, toDate: string, experienceId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetExperienceAvailabilityTimeSlotDto>({
      method: 'GET',
      url: '/api/app/experiences-guest/GetExperienceAvailabilityDate',
      params: { fromDate, toDate, experienceId },
    },
    { apiName: this.apiName,...config });
  

  getExperienceAvailabilityTimeByDateAndExperienceId = (date: string, experienceId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetExperienceAvailabilityTimeSlotDto>({
      method: 'GET',
      url: '/api/app/experiences-guest/GetExperienceAvailabilityTime',
      params: { date, experienceId },
    },
    { apiName: this.apiName,...config });
  

  getExperienceReservationTypeLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto<number>>({
      method: 'GET',
      url: '/api/app/experiences-guest/experience-reservation-type-lookup',
    },
    { apiName: this.apiName,...config });
  

  getExperienceReservationWayLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto<number>>({
      method: 'GET',
      url: '/api/app/experiences-guest/experience-reservation-way-lookup',
    },
    { apiName: this.apiName,...config });
  

  getExperienceTypeLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceTypeDto[]>({
      method: 'GET',
      url: '/api/app/experiences-guest/experience-type-lookup',
    },
    { apiName: this.apiName,...config });
  

  getExperienceTypeLookupPaginated = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ExperienceTypeDto>>({
      method: 'GET',
      url: '/api/app/experiences-guest/experience-type-lookup/paginated',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetExperiencesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ExperienceWithNavigationPropertiesDto>>({
      method: 'GET',
      url: '/api/app/experiences-guest',
      params: { cityIds: input.cityIds, experienceTypeIds: input.experienceTypeIds, dateFrom: input.dateFrom, dateTo: input.dateTo, showOnHome: input.showOnHome, filterText: input.filterText, name: input.name, experienceStatus: input.experienceStatus, district: input.district, postalCode: input.postalCode, lngMin: input.lngMin, lngMax: input.lngMax, latMin: input.latMin, latMax: input.latMax, description: input.description, moreDetails: input.moreDetails, experienceReservationType: input.experienceReservationType, adultPriceMin: input.adultPriceMin, adultPriceMax: input.adultPriceMax, childPriceMin: input.childPriceMin, childPriceMax: input.childPriceMax, numberOfHoursMin: input.numberOfHoursMin, numberOfHoursMax: input.numberOfHoursMax, numberOfDaysMin: input.numberOfDaysMin, numberOfDaysMax: input.numberOfDaysMax, basicPriceMin: input.basicPriceMin, basicPriceMax: input.basicPriceMax, minNumberOfAdultsMin: input.minNumberOfAdultsMin, minNumberOfAdultsMax: input.minNumberOfAdultsMax, maxNumberOfAdultsMin: input.maxNumberOfAdultsMin, maxNumberOfAdultsMax: input.maxNumberOfAdultsMax, minNumberOfChildrenMin: input.minNumberOfChildrenMin, minNumberOfChildrenMax: input.minNumberOfChildrenMax, maxNumberOfChildrenMin: input.maxNumberOfChildrenMin, maxNumberOfChildrenMax: input.maxNumberOfChildrenMax, experienceReservationWay: input.experienceReservationWay, experienceTypeId: input.experienceTypeId, cityId: input.cityId, experienceRefundTypeId: input.experienceRefundTypeId, meanId: input.meanId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getMeanLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, MeanDto[]>({
      method: 'GET',
      url: '/api/app/experiences-guest/mean-lookup',
    },
    { apiName: this.apiName,...config });
  

  getRandomByCount = (count: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceWithNavigationPropertiesDto[]>({
      method: 'GET',
      url: `/api/app/experiences-guest/get-random/${count}`,
    },
    { apiName: this.apiName,...config });
  

  getRelatedVacationHomesPaginated = (input: GetRelatedExperiencesInputForGuest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<GetExperienceListItemForGuestDto>>({
      method: 'GET',
      url: '/api/app/experiences-guest/related-experience/paginated',
      params: { experienceId: input.experienceId, cityId: input.cityId, experienceTypeId: input.experienceTypeId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getReservedDatesByExperienceId = (experienceId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string[]>({
      method: 'GET',
      url: `/api/app/experiences-guest/get-reseved-dates/${experienceId}`,
    },
    { apiName: this.apiName,...config });
  

  getUsedTypes = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceTypeLookupDto[]>({
      method: 'GET',
      url: '/api/app/experiences-guest/get-used-types',
    },
    { apiName: this.apiName,...config });
  

  getWithNavigationProperties = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceWithNavigationPropertiesDto>({
      method: 'GET',
      url: `/api/app/experiences-guest/with-navigation-properties/${id}`,
    },
    { apiName: this.apiName,...config });
  

  paymentByInput = (input: CreateExperiencePaymentDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CreatePaymentResultDto>({
      method: 'POST',
      url: '/api/app/experiences-guest/payment',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  reserve = (reservation: string, status: GetReservationStatus, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/app/experiences-guest/reserve',
      params: { reservation },
    },
    { apiName: this.apiName,...config });
  

  upload = (file: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BlobDto>({
      method: 'POST',
      url: '/api/app/experiences-guest/upload',
      body: file,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
