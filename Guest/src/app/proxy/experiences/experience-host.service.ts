import type { ExperienceCountDto, ExperienceCountTypesDto, ExperienceDto, ExperienceStep1, ExperienceStep2, ExperienceStep3, ExperienceStep4, ExperienceStep5, ExperienceStep6, ExperienceWithNavigationPropertiesDto, GetExperiencesInput } from './models';
import type { VisibleStatus } from './visible-status.enum';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CityDto } from '../cities/models';
import type { ExperienceTypeDto } from '../experience-types/models';
import type { BlobDto } from '../files/models';
import type { MeanDto } from '../means/models';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';
import type { AgreementInformationDto, LookupDto, LookupRequestDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ExperienceHostService {
  apiName = 'Default';
  

  agreeById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/experiences-host/agree/${id}`,
    },
    { apiName: this.apiName,...config });
  

  agreementInformationById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AgreementInformationDto>({
      method: 'GET',
      url: `/api/app/experiences-host/agreement-information/${id}`,
    },
    { apiName: this.apiName,...config });
  

  changeVisibleStatusByIdAndVisibleStatus = (id: number, visibleStatus: VisibleStatus, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/experiences-host/change-visible-status/${id}`,
      params: { visibleStatus },
    },
    { apiName: this.apiName,...config });
  

  download = (fileName: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/api/app/experiences-host/download/${fileName}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceDto>({
      method: 'GET',
      url: `/api/app/experiences-host/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getCancellationAndReturnPolicyLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto<number>>({
      method: 'GET',
      url: '/api/app/experiences-host/cancellation-and-return-policy-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getCityLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, CityDto[]>({
      method: 'GET',
      url: '/api/app/experiences-host/city-lookup',
    },
    { apiName: this.apiName,...config });
  

  getCount = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceCountDto>({
      method: 'GET',
      url: '/api/app/experiences-host/count',
    },
    { apiName: this.apiName,...config });
  

  getExperienceReservationTypeLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto<number>>({
      method: 'GET',
      url: '/api/app/experiences-host/experience-reservation-type-lookup',
    },
    { apiName: this.apiName,...config });
  

  getExperienceReservationWayLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto<number>>({
      method: 'GET',
      url: '/api/app/experiences-host/experience-reservation-way-lookup',
    },
    { apiName: this.apiName,...config });
  

  getExperienceStatusLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto<number>>({
      method: 'GET',
      url: '/api/app/experiences-host/experience-status-type-lookup',
    },
    { apiName: this.apiName,...config });
  

  getExperienceTypeLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceTypeDto[]>({
      method: 'GET',
      url: '/api/app/experiences-host/experience-type-lookup',
    },
    { apiName: this.apiName,...config });
  

  getExperienceTypesCount = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceCountTypesDto>({
      method: 'GET',
      url: '/api/app/experiences-host/experience-types-counts',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetExperiencesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ExperienceWithNavigationPropertiesDto>>({
      method: 'GET',
      url: '/api/app/experiences-host',
      params: { cityIds: input.cityIds, experienceTypeIds: input.experienceTypeIds, dateFrom: input.dateFrom, dateTo: input.dateTo, showOnHome: input.showOnHome, filterText: input.filterText, name: input.name, experienceStatus: input.experienceStatus, district: input.district, postalCode: input.postalCode, lngMin: input.lngMin, lngMax: input.lngMax, latMin: input.latMin, latMax: input.latMax, description: input.description, moreDetails: input.moreDetails, experienceReservationType: input.experienceReservationType, experienceReservationWay: input.experienceReservationWay, experienceTypeId: input.experienceTypeId, cityId: input.cityId, meanId: input.meanId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getMeanLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, MeanDto[]>({
      method: 'GET',
      url: '/api/app/experiences-host/mean-lookup',
    },
    { apiName: this.apiName,...config });
  

  getWithNavigationProperties = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceWithNavigationPropertiesDto>({
      method: 'GET',
      url: `/api/app/experiences-host/with-navigation-properties/${id}`,
    },
    { apiName: this.apiName,...config });
  

  publishExperienceById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceDto>({
      method: 'PUT',
      url: `/api/app/experiences-host/publish/${id}`,
    },
    { apiName: this.apiName,...config });
  

  saveStep1ByInput = (input: ExperienceStep1, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceDto>({
      method: 'PUT',
      url: '/api/app/experiences-host/Save/1',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  saveStep2ByInput = (input: ExperienceStep2, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceDto>({
      method: 'PUT',
      url: '/api/app/experiences-host/Save/2',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  saveStep3ByInput = (input: ExperienceStep3, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceDto>({
      method: 'PUT',
      url: '/api/app/experiences-host/Save/3',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  saveStep4ByInput = (input: ExperienceStep4, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceDto>({
      method: 'PUT',
      url: '/api/app/experiences-host/Save/4',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  saveStep5ByInput = (input: ExperienceStep5, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceDto>({
      method: 'PUT',
      url: '/api/app/experiences-host/Save/5',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  saveStep6ByInput = (input: ExperienceStep6, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceDto>({
      method: 'PUT',
      url: '/api/app/experiences-host/Save/6',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  upload = (file: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BlobDto>({
      method: 'POST',
      url: '/api/app/experiences-host/upload',
      body: file,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
