import type { HostWalletDto, HostWalletGetListInput, HostWalletStatisticDto, InitiateHostWalletTransferInput } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { BlobDto } from '../files/models';

@Injectable({
  providedIn: 'root',
})
export class HostWalletsService {
  apiName = 'Default';
  

  confirmTransfer = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/host-wallets/${id}/confirm-transfer`,
    },
    { apiName: this.apiName,...config });
  

  downloadTransferReceipt = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BlobDto>({
      method: 'POST',
      url: `/api/app/host-wallets/${id}/download-transfer-receipt`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: HostWalletGetListInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<HostWalletDto>>({
      method: 'GET',
      url: '/api/app/host-wallets',
      params: { status: input.status, filterText: input.filterText, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getStatistic = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, HostWalletStatisticDto>({
      method: 'GET',
      url: '/api/app/host-wallets/statistic',
    },
    { apiName: this.apiName,...config });
  

  initiateTransfer = (input: InitiateHostWalletTransferInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/host-wallets/initiate-transfer',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
