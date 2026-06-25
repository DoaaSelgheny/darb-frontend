import type { GetPromoCodesInput, PromoCodeCreateDto, PromoCodeDto, PromoCodeExcelDownloadDto, PromoCodeUpdateDto, PromoCodeWithNavigationPropertiesDto, ServiceLookUp } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DownloadTokenResultDto, LookupDto, LookupRequestDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class PromoCodeService {
  apiName = 'Default';
  

  create = (input: PromoCodeCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PromoCodeDto>({
      method: 'POST',
      url: '/api/app/promo-codes',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  createForHost = (input: PromoCodeCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PromoCodeDto>({
      method: 'POST',
      url: '/api/app/promo-codes/create-for-host',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/promo-codes/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PromoCodeDto>({
      method: 'GET',
      url: `/api/app/promo-codes/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/promo-codes/download-token',
    },
    { apiName: this.apiName,...config });
  

  getExperienceLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<number>>>({
      method: 'GET',
      url: '/api/app/promo-codes/experience-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getForHost = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PromoCodeDto>({
      method: 'GET',
      url: `/api/app/promo-codes/get-for-host/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getHostExperienceLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ServiceLookUp[]>({
      method: 'GET',
      url: '/api/app/promo-codes/host-experience-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getHostList = (input: GetPromoCodesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<PromoCodeWithNavigationPropertiesDto>>({
      method: 'GET',
      url: '/api/app/promo-codes/get-host-list',
      params: { filterText: input.filterText, couponCode: input.couponCode, startDateMin: input.startDateMin, startDateMax: input.startDateMax, endDateMin: input.endDateMin, endDateMax: input.endDateMax, consumingCountPerUserMin: input.consumingCountPerUserMin, consumingCountPerUserMax: input.consumingCountPerUserMax, discountType: input.discountType, discountValueMin: input.discountValueMin, discountValueMax: input.discountValueMax, isGlobal: input.isGlobal, isSuspended: input.isSuspended, vacationHomeId: input.vacationHomeId, experienceId: input.experienceId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getHostVacationHomeLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ServiceLookUp[]>({
      method: 'GET',
      url: '/api/app/promo-codes/host-vacation-home-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetPromoCodesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<PromoCodeWithNavigationPropertiesDto>>({
      method: 'GET',
      url: '/api/app/promo-codes',
      params: { filterText: input.filterText, couponCode: input.couponCode, startDateMin: input.startDateMin, startDateMax: input.startDateMax, endDateMin: input.endDateMin, endDateMax: input.endDateMax, consumingCountPerUserMin: input.consumingCountPerUserMin, consumingCountPerUserMax: input.consumingCountPerUserMax, discountType: input.discountType, discountValueMin: input.discountValueMin, discountValueMax: input.discountValueMax, isGlobal: input.isGlobal, isSuspended: input.isSuspended, vacationHomeId: input.vacationHomeId, experienceId: input.experienceId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: PromoCodeExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/promo-codes/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, couponCode: input.couponCode, startDateMin: input.startDateMin, startDateMax: input.startDateMax, endDateMin: input.endDateMin, endDateMax: input.endDateMax, consumingCountPerUserMin: input.consumingCountPerUserMin, consumingCountPerUserMax: input.consumingCountPerUserMax, discountType: input.discountType, discountValueMin: input.discountValueMin, discountValueMax: input.discountValueMax, isGlobal: input.isGlobal, isSuspended: input.isSuspended, vacationHomeId: input.vacationHomeId, experienceId: input.experienceId },
    },
    { apiName: this.apiName,...config });
  

  getVacationHomeLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<number>>>({
      method: 'GET',
      url: '/api/app/promo-codes/vacation-home-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getWithNavigationProperties = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PromoCodeWithNavigationPropertiesDto>({
      method: 'GET',
      url: `/api/app/promo-codes/with-navigation-properties/${id}`,
    },
    { apiName: this.apiName,...config });
  

  hostSuspended = (id: string, isSuspended: boolean, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/promo-codes/host-promo-code-suspended/${id}/${isSuspended}`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: PromoCodeUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PromoCodeDto>({
      method: 'PUT',
      url: `/api/app/promo-codes/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  updateForHost = (id: string, input: PromoCodeUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PromoCodeDto>({
      method: 'PUT',
      url: `/api/app/promo-codes/host-update/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
