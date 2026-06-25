import type { AgreedUserAgreementDto, CreateUpdateAgreedUserAgreementDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgreedUserAgreementService {
  apiName = 'Default';
  

  create = (input: CreateUpdateAgreedUserAgreementDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AgreedUserAgreementDto>({
      method: 'POST',
      url: '/api/app/agreed-user-agreement',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/agreed-user-agreement/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AgreedUserAgreementDto>({
      method: 'GET',
      url: `/api/app/agreed-user-agreement/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getHasUserAgreedToLatestPolicy = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'GET',
      url: '/api/app/agreed-user-agreement/has-user-agreed-to-latest-policy',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<AgreedUserAgreementDto>>({
      method: 'GET',
      url: '/api/app/agreed-user-agreement',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateAgreedUserAgreementDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AgreedUserAgreementDto>({
      method: 'PUT',
      url: `/api/app/agreed-user-agreement/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
