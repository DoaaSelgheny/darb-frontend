import type { CityCreateDto, CityDto, CityExcelDownloadDto, CityUpdateDto, CityWithNavigationPropertiesDto, GetCitiesInput } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupDto, LookupRequestDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  apiName = 'Default';
  

  create = (input: CityCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CityDto>({
      method: 'POST',
      url: '/api/app/cities',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/cities/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CityDto>({
      method: 'GET',
      url: `/api/app/cities/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getCountryLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<number>>>({
      method: 'GET',
      url: '/api/app/cities/country-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetCitiesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CityWithNavigationPropertiesDto>>({
      method: 'GET',
      url: '/api/app/cities',
      params: { filterText: input.filterText, name: input.name, countryId: input.countryId, regionId: input.regionId, lat: input.lat, lng: input.lng, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: CityExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/cities/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, name: input.name, countryId: input.countryId },
    },
    { apiName: this.apiName,...config });
  

  getLookupByInput = (input: GetCitiesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CityDto[]>({
      method: 'GET',
      url: '/api/app/cities/lookup',
      params: { filterText: input.filterText, name: input.name, countryId: input.countryId, regionId: input.regionId, lat: input.lat, lng: input.lng, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getWithNavigationProperties = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CityWithNavigationPropertiesDto>({
      method: 'GET',
      url: `/api/app/cities/with-navigation-properties/${id}`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CityUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CityDto>({
      method: 'PUT',
      url: `/api/app/cities/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
