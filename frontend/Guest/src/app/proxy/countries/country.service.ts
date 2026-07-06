import type { CountryCreateDto, CountryDto, CountryUpdateDto, GetCountriesInput } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  apiName = 'Default';
  

  create = (input: CountryCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CountryDto>({
      method: 'POST',
      url: '/api/app/countries',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/countries/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CountryDto>({
      method: 'GET',
      url: `/api/app/countries/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetCountriesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CountryDto>>({
      method: 'GET',
      url: '/api/app/countries',
      params: { filterText: input.filterText, name: input.name, isO3: input.isO3, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CountryUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CountryDto>({
      method: 'PUT',
      url: `/api/app/countries/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
