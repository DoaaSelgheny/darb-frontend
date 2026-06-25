import type { GetMeansInput, MeanCreateDto, MeanDto, MeanExcelDownloadDto, MeanUpdateDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DownloadTokenResultDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class MeanService {
  apiName = 'Default';
  

  create = (input: MeanCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MeanDto>({
      method: 'POST',
      url: '/api/app/means',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/means/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MeanDto>({
      method: 'GET',
      url: `/api/app/means/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getAllList = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, MeanDto[]>({
      method: 'GET',
      url: '/api/app/means/GetAllList',
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/means/download-token',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetMeansInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<MeanDto>>({
      method: 'GET',
      url: '/api/app/means',
      params: { filterText: input.filterText, name: input.name, type: input.type, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: MeanExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/means/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, name: input.name },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: MeanUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MeanDto>({
      method: 'PUT',
      url: `/api/app/means/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
