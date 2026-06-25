import type { BedTypeCreateDto, BedTypeDto, BedTypeExcelDownloadDto, BedTypeUpdateDto, GetBedTypesInput } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DownloadTokenResultDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class BedTypeService {
  apiName = 'Default';
  

  create = (input: BedTypeCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BedTypeDto>({
      method: 'POST',
      url: '/api/app/bed-types',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/bed-types/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BedTypeDto>({
      method: 'GET',
      url: `/api/app/bed-types/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/bed-types/download-token',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetBedTypesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<BedTypeDto>>({
      method: 'GET',
      url: '/api/app/bed-types',
      params: { filterText: input.filterText, nameAr: input.nameAr, nameEn: input.nameEn, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: BedTypeExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/bed-types/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, nameAr: input.nameAr, nameEn: input.nameEn },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: BedTypeUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BedTypeDto>({
      method: 'PUT',
      url: `/api/app/bed-types/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
