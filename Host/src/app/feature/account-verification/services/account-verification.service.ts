import { BlobDto } from '@proxy/files';

import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { DownloadTokenResultDto } from '@volo/abp.ng.identity/proxy';
import { AccountVerificationStatus } from '../../account-verification/services/enum/account-verification-status.enum';
import { YakeenVerificationType } from './enum';
import {
  AccountVerificationCreateDto,
  AccountVerificationDto,
  AccountVerificationExcelDownloadDto,
  AccountVerificationUpdateDto,
  GetAccountVerificationsInput,
  YakeenVerificationDto,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class AccountVerificationService {
  apiName = 'Default';

  create = (input: AccountVerificationCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AccountVerificationDto>(
      {
        method: 'POST',
        url: '/api/app/account-verifications',
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: `/api/app/account-verifications/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  download = (name: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BlobDto>(
      {
        method: 'GET',
        url: '/api/app/account-verifications/download',
        params: { name },
      },
      { apiName: this.apiName, ...config },
    );

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AccountVerificationDto>(
      {
        method: 'GET',
        url: `/api/app/account-verifications/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  getByCreatorId = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, AccountVerificationDto>(
      {
        method: 'GET',
        url: '/api/app/account-verifications/get-account-verification',
      },
      { apiName: this.apiName, ...config },
    );

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>(
      {
        method: 'GET',
        url: '/api/app/account-verifications/download-token',
      },
      { apiName: this.apiName, ...config },
    );

  getList = (input: GetAccountVerificationsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<AccountVerificationDto>>(
      {
        method: 'GET',
        url: '/api/app/account-verifications',
        params: {
          filterText: input.filterText,
          saudiID: input.saudiID,
          dateOfBirthMin: input.dateOfBirthMin,
          dateOfBirthMax: input.dateOfBirthMax,
          accountHolder: input.accountHolder,
          ibanNumber: input.ibanNumber,
          accountNumber: input.accountNumber,
          bankName: input.bankName,
          licenseFile: input.licenseFile,
          attachedSaudiID: input.attachedSaudiID,
          status: input.status,
          type: input.type,
          iqama: input.iqama,
          passport: input.passport,
          yakeenVerificationType: input.yakeenVerificationType,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      { apiName: this.apiName, ...config },
    );

  getListAsExcelFile = (
    input: AccountVerificationExcelDownloadDto,
    config?: Partial<Rest.Config>,
  ) =>
    this.restService.request<any, Blob>(
      {
        method: 'GET',
        responseType: 'blob',
        url: '/api/app/account-verifications/as-excel-file',
        params: {
          downloadToken: input.downloadToken,
          filterText: input.filterText,
          saudiID: input.saudiID,
          dateOfBirthMin: input.dateOfBirthMin,
          dateOfBirthMax: input.dateOfBirthMax,
          accountHolder: input.accountHolder,
          ibanNumber: input.ibanNumber,
          accountNumber: input.accountNumber,
          bankName: input.bankName,
          licenseFile: input.licenseFile,
          attachedSaudiID: input.attachedSaudiID,
          status: input.status,
          type: input.type,
          iqama: input.iqama,
          passport: input.passport,
          yakeenVerificationType: input.yakeenVerificationType,
        },
      },
      { apiName: this.apiName, ...config },
    );

  update = (id: string, input: AccountVerificationUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AccountVerificationDto>(
      {
        method: 'PUT',
        url: `/api/app/account-verifications/${id}`,
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  updateStatus = (id: string, Status: AccountVerificationStatus, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AccountVerificationDto>(
      {
        method: 'PUT',
        url: '/api/app/account-verifications/update-status',
        params: { id, status: Status },
      },
      { apiName: this.apiName, ...config },
    );

  upload = (file: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BlobDto>(
      {
        method: 'POST',
        url: '/api/app/account-verifications/upload',
        body: file,
      },
      { apiName: this.apiName, ...config },
    );

  yakeenVerification = (
    SaudiId: string,
    dateOfBirth: string,
    yakeenVerificationType: YakeenVerificationType,
    nationality?: string,
    config?: Partial<Rest.Config>,
  ) =>
    this.restService.request<any, YakeenVerificationDto>(
      {
        method: 'PUT',
        url: '/api/app/account-verifications/verify',
        params: { saudiId: SaudiId, dateOfBirth, yakeenVerificationType, nationality },
      },
      { apiName: this.apiName, ...config },
    );

  constructor(private restService: RestService) {}
}
