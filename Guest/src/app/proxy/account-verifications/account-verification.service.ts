import type { AccountVerificationType } from './enum/account-verification-type.enum';
import type { YakeenVerificationType } from './enum/yakeen-verification-type.enum';
import type { AccountVerificationDto, AccountVerificationTakeActionDto, GetAccountVerificationsInput, MinistryTourismVerificationCreateDto, UserVerificationRequestDto, VerifiedMinistryTourismDto, YakeenVerificationDto } from './models';
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
      params: { filterText: input.filterText, saudiID: input.saudiID, dateOfBirthMin: input.dateOfBirthMin, dateOfBirthMax: input.dateOfBirthMax, accountHolder: input.accountHolder, ibanNumber: input.ibanNumber, accountNumber: input.accountNumber, bankName: input.bankName, licenseFile: input.licenseFile, attachedSaudiID: input.attachedSaudiID, status: input.status, type: input.type, iqama: input.iqama, passport: input.passport, yakeenVerificationType: input.yakeenVerificationType, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  takeAction = (id: string, accountVerificationTakeActionDto: AccountVerificationTakeActionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AccountVerificationDto>({
      method: 'PUT',
      url: `/api/app/account-verifications/${id}/take-action`,
      body: accountVerificationTakeActionDto,
    },
    { apiName: this.apiName,...config });
  

  update = (input: UserVerificationRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AccountVerificationDto>({
      method: 'PUT',
      url: '/api/app/account-verifications/SendVerificationRequest',
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
  

  verifiedMinistryTourismByInput = (input: MinistryTourismVerificationCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VerifiedMinistryTourismDto>({
      method: 'POST',
      url: '/api/app/account-verifications/VerifiedMinistryTourism',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  yakeenVerification = (SaudiId: string, dateOfBirth: string, yakeenVerificationType: YakeenVerificationType, nationality?: string, type: AccountVerificationType = 2, config?: Partial<Rest.Config>) =>
    this.restService.request<any, YakeenVerificationDto>({
      method: 'PUT',
      url: '/api/app/account-verifications/verify',
      params: { saudiId: SaudiId, dateOfBirth, yakeenVerificationType, nationality, type },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
