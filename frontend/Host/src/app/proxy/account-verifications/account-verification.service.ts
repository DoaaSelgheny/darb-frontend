import type { AccountVerificationDto, AccountVerificationTakeActionDto, GetAccountVerificationsInput, SubmitIdentityVerificationDto, UpdateAccountVerificationCommissionDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { BlobDto } from '../files/models';

@Injectable({
  providedIn: 'root',
})
export class AccountVerificationService {
  apiName = 'Default';
  

  download = (name: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BlobDto>({
      method: 'GET',
      url: '/api/app/account-verifications/download',
      params: { name },
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AccountVerificationDto>({
      method: 'GET',
      url: `/api/app/account-verifications/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getByCreatorId = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, AccountVerificationDto>({
      method: 'GET',
      url: '/api/app/account-verifications/get-account-verification',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetAccountVerificationsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<AccountVerificationDto>>({
      method: 'GET',
      url: '/api/app/account-verifications',
      params: { filterText: input.filterText, attachedSaudiIDFront: input.attachedSaudiIDFront, attachedSaudiIDBack: input.attachedSaudiIDBack, status: input.status, type: input.type, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  submitIdentityVerification = (input: SubmitIdentityVerificationDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AccountVerificationDto>({
      method: 'PUT',
      url: '/api/app/account-verifications/submit-identity',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  takeAction = (id: string, accountVerificationTakeActionDto: AccountVerificationTakeActionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AccountVerificationDto>({
      method: 'PUT',
      url: `/api/app/account-verifications/${id}/take-action`,
      body: accountVerificationTakeActionDto,
    },
    { apiName: this.apiName,...config });
  

  updateCommissionPercentages = (id: string, input: UpdateAccountVerificationCommissionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AccountVerificationDto>({
      method: 'PUT',
      url: `/api/app/account-verifications/${id}/commission`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  upload = (file: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BlobDto>({
      method: 'POST',
      url: '/api/app/account-verifications/upload',
      body: file,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
