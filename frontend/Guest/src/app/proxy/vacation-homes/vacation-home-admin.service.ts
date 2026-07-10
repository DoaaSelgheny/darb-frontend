import type { ChangeVacationHomeStatusDto, GetVacationHomesInputForGuest, VacationHomeDto, VacationHomeWithNavigationPropertiesDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CityDto } from '../cities/models';
import type { DistinguishServiceFilterDto, DistinguishVacationHomeDto } from '../combined-services/models';
import type { LookupDto, LookupRequestDto } from '../shared/models';
import type { VacationHomeTypeDto } from '../vacation-home-types/models';

@Injectable({
  providedIn: 'root',
})
export class VacationHomeAdminService {
  apiName = 'Default';
  

  changeVacationHomePublishStatusByInput = (input: ChangeVacationHomeStatusDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeDto>({
      method: 'PUT',
      url: '/api/app/vacation-home-admin/change-publish-status',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  getCityLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CityDto[]>({
      method: 'GET',
      url: '/api/app/vacation-home-admin/city-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getDistinguishVacationHomeListByFilter = (filter: DistinguishServiceFilterDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<DistinguishVacationHomeDto>>({
      method: 'GET',
      url: '/api/app/vacation-home-admin/distinguish-list',
      params: { keyword: filter.keyword, skipCount: filter.skipCount, maxResultCount: filter.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetVacationHomesInputForGuest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<VacationHomeWithNavigationPropertiesDto>>({
      method: 'GET',
      url: '/api/app/vacation-home-admin',
      params: { filterText: input.filterText, priceFrom: input.priceFrom, priceTo: input.priceTo, cityId: input.cityId, vacationHomeTypeId: input.vacationHomeTypeId, cityIds: input.cityIds, vacationHomeTypeIds: input.vacationHomeTypeIds, dateFrom: input.dateFrom, dateTo: input.dateTo, showOnHome: input.showOnHome, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getVacationHomeTypeLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto<number>>({
      method: 'GET',
      url: '/api/app/vacation-home-admin/vacation-home-types-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getVacationHomeTypes = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeTypeDto[]>({
      method: 'GET',
      url: '/api/app/vacation-home-admin/vacation-home-types',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getWithNavigationProperties = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeWithNavigationPropertiesDto>({
      method: 'GET',
      url: `/api/app/vacation-home-admin/${id}`,
    },
    { apiName: this.apiName,...config });
  

  setShowOnHomePageByIdAndShowOnHomePage = (id: number, showOnHomePage: boolean, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PATCH',
      url: `/api/app/vacation-home-admin/set-show-on-homepage/${id}`,
      params: { showOnHomePage },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
