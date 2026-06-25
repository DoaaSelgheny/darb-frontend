import type { DistinguishExperienceDto, ExperienceDto, ExperienceWithNavigationPropertiesDto, GetExperiencesInput } from './models';
import type { VisibleStatus } from './visible-status.enum';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CityDto } from '../cities/models';
import type { DistinguishServiceFilterDto } from '../combined-services/models';
import type { ExperienceTypeDto } from '../experience-types/models';
import type { MeanDto } from '../means/models';
import type { LookupDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ExperienceAdminService {
  apiName = 'Default';
  

  changeVisibleStatusByIdAndVisibleStatus = (id: number, visibleStatus: VisibleStatus, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/experiences-admin/change-visible-status/${id}`,
      params: { visibleStatus },
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceDto>({
      method: 'GET',
      url: `/api/app/experiences-admin/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getCityLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, CityDto[]>({
      method: 'GET',
      url: '/api/app/experiences-admin/city-lookup',
    },
    { apiName: this.apiName,...config });
  

  getDistinguishVacationHomeListByFilter = (filter: DistinguishServiceFilterDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<DistinguishExperienceDto>>({
      method: 'GET',
      url: '/api/app/experiences-admin/distinguish-list',
      params: { keyword: filter.keyword, skipCount: filter.skipCount, maxResultCount: filter.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getExperienceReservationTypeLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto<number>>({
      method: 'GET',
      url: '/api/app/experiences-admin/experience-reservation-type-lookup',
    },
    { apiName: this.apiName,...config });
  

  getExperienceReservationWayLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto<number>>({
      method: 'GET',
      url: '/api/app/experiences-admin/experience-reservation-way-lookup',
    },
    { apiName: this.apiName,...config });
  

  getExperienceStatusLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto<number>>({
      method: 'GET',
      url: '/api/app/experiences-admin/experience-status',
    },
    { apiName: this.apiName,...config });
  

  getExperienceTypeLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceTypeDto[]>({
      method: 'GET',
      url: '/api/app/experiences-admin/experience-type-lookup',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetExperiencesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ExperienceWithNavigationPropertiesDto>>({
      method: 'GET',
      url: '/api/app/experiences-admin',
      params: { cityIds: input.cityIds, experienceTypeIds: input.experienceTypeIds, dateFrom: input.dateFrom, dateTo: input.dateTo, showOnHome: input.showOnHome, filterText: input.filterText, name: input.name, experienceStatus: input.experienceStatus, district: input.district, postalCode: input.postalCode, lngMin: input.lngMin, lngMax: input.lngMax, latMin: input.latMin, latMax: input.latMax, description: input.description, moreDetails: input.moreDetails, experienceReservationType: input.experienceReservationType, experienceReservationWay: input.experienceReservationWay, experienceTypeId: input.experienceTypeId, cityId: input.cityId, meanId: input.meanId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getMeanLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, MeanDto[]>({
      method: 'GET',
      url: '/api/app/experiences-admin/mean-lookup',
    },
    { apiName: this.apiName,...config });
  

  getWithNavigationProperties = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceWithNavigationPropertiesDto>({
      method: 'GET',
      url: `/api/app/experiences-admin/with-navigation-properties/${id}`,
    },
    { apiName: this.apiName,...config });
  

  setShowOnHomePageByIdAndShowOnHomePage = (id: number, showOnHomePage: boolean, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PATCH',
      url: `/api/app/experiences-admin/set-show-on-homepage/${id}`,
      params: { showOnHomePage },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
