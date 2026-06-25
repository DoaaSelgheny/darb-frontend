import type { AmenitiesCreateDto, AmenitiesDto, AmenitiesExcelDownloadDto, AmenitiesUpdateDto, GetAmenitiessInput } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DownloadTokenResultDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class AmenitiesService {
  apiName = 'Default';
  

  create = (input: AmenitiesCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AmenitiesDto>({
      method: 'POST',
      url: '/api/app/amenitiess',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/amenitiess/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AmenitiesDto>({
      method: 'GET',
      url: `/api/app/amenitiess/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getAllList = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, AmenitiesDto[]>({
      method: 'GET',
      url: '/api/app/amenitiess/GetAllList',
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/amenitiess/download-token',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetAmenitiessInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<AmenitiesDto>>({
      method: 'GET',
      url: '/api/app/amenitiess',
      params: { filterText: input.filterText, nameAr: input.nameAr, nameEn: input.nameEn, descriptionAr: input.descriptionAr, descriptionEn: input.descriptionEn, symbol: input.symbol, status: input.status, isMainFacility: input.isMainFacility, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: AmenitiesExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/amenitiess/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, nameAr: input.nameAr, nameEn: input.nameEn, descriptionAr: input.descriptionAr, descriptionEn: input.descriptionEn, symbol: input.symbol, status: input.status },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: AmenitiesUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AmenitiesDto>({
      method: 'PUT',
      url: `/api/app/amenitiess/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
