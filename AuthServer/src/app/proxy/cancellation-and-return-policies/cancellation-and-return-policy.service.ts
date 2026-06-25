import type { CancellationAndReturnPolicyCreateDto, CancellationAndReturnPolicyDto, CancellationAndReturnPolicyExcelDownloadDto, CancellationAndReturnPolicyUpdateDto, GetCancellationAndReturnPoliciesInput } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DownloadTokenResultDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class CancellationAndReturnPolicyService {
  apiName = 'Default';
  

  create = (input: CancellationAndReturnPolicyCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CancellationAndReturnPolicyDto>({
      method: 'POST',
      url: '/api/app/cancellation-and-return-policies',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/cancellation-and-return-policies/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CancellationAndReturnPolicyDto>({
      method: 'GET',
      url: `/api/app/cancellation-and-return-policies/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getAllList = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, CancellationAndReturnPolicyDto[]>({
      method: 'GET',
      url: '/api/app/cancellation-and-return-policies/GetAllList',
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/cancellation-and-return-policies/download-token',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetCancellationAndReturnPoliciesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CancellationAndReturnPolicyDto>>({
      method: 'GET',
      url: '/api/app/cancellation-and-return-policies',
      params: { filterText: input.filterText, nameEn: input.nameEn, nameAr: input.nameAr, code: input.code, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: CancellationAndReturnPolicyExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/cancellation-and-return-policies/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, nameEn: input.nameEn, nameAr: input.nameAr, code: input.code },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CancellationAndReturnPolicyUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CancellationAndReturnPolicyDto>({
      method: 'PUT',
      url: `/api/app/cancellation-and-return-policies/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
