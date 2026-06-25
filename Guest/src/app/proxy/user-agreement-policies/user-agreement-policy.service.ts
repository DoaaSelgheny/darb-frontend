import type { CreateUpdateUserAgreementPolicyDto, UserAgreementPolicyDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAgreementPolicyService {
  apiName = 'Default';
  

  create = (input: CreateUpdateUserAgreementPolicyDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, UserAgreementPolicyDto>({
      method: 'POST',
      url: '/api/app/user-agreement-policy',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/user-agreement-policy/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, UserAgreementPolicyDto>({
      method: 'GET',
      url: `/api/app/user-agreement-policy/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getLatestUserAgreementPolicy = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, UserAgreementPolicyDto>({
      method: 'GET',
      url: '/api/app/user-agreement-policy/latest-user-agreement-policy',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<UserAgreementPolicyDto>>({
      method: 'GET',
      url: '/api/app/user-agreement-policy',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateUserAgreementPolicyDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, UserAgreementPolicyDto>({
      method: 'PUT',
      url: `/api/app/user-agreement-policy/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
