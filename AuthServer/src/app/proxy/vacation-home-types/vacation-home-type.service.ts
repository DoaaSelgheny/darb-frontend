import type { ActivateDeactivateHomeTypeRequestDto, GetVacationHomeTypesInput, VacationHomeTypeDto, VacationHomeTypeRequestDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { BlobDto } from '../files/models';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class VacationHomeTypeService {
  apiName = 'Default';
  

  activateDeactivate = (id: number, input: ActivateDeactivateHomeTypeRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/vacation-home-types/change-status/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  create = (input: VacationHomeTypeRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeTypeDto>({
      method: 'POST',
      url: '/api/app/vacation-home-types',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  download = (fileName: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/api/app/vacation-home-types/download/${fileName}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeTypeDto>({
      method: 'GET',
      url: `/api/app/vacation-home-types/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetVacationHomeTypesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<VacationHomeTypeDto>>({
      method: 'GET',
      url: '/api/app/vacation-home-types',
      params: { filterText: input.filterText, description: input.description, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: VacationHomeTypeRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeTypeDto>({
      method: 'PUT',
      url: `/api/app/vacation-home-types/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  upload = (file: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BlobDto>({
      method: 'POST',
      url: '/api/app/vacation-home-types/upload',
      body: file,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
