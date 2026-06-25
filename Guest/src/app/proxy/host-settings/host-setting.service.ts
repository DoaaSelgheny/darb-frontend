import type { GetHostSettingsInput, HostSettingCreateDto, HostSettingDto, HostSettingExcelDownloadDto, HostSettingUpdateDto, HostSettingWithNavigationPropertiesDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DownloadTokenResultDto, LookupDto, LookupRequestDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class HostSettingService {
  apiName = 'Default';
  

  create = (input: HostSettingCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HostSettingDto>({
      method: 'POST',
      url: '/api/app/host-settings',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/host-settings/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HostSettingDto>({
      method: 'GET',
      url: `/api/app/host-settings/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getCancellationAndReturnPolicyLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<number>>>({
      method: 'GET',
      url: '/api/app/host-settings/cancellation-and-return-policy-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/host-settings/download-token',
    },
    { apiName: this.apiName,...config });
  

  getHostSettingCancellationAndReturnPolicy = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, number[]>({
      method: 'GET',
      url: '/api/app/host-settings/host-setting-cancellation-and-return-policy',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetHostSettingsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<HostSettingWithNavigationPropertiesDto>>({
      method: 'GET',
      url: '/api/app/host-settings',
      params: { filterText: input.filterText, timeToEnter: input.timeToEnter, timeToLeave: input.timeToLeave, cancellationAndReturnPolicyId: input.cancellationAndReturnPolicyId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: HostSettingExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/host-settings/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, timeToEnter: input.timeToEnter, timeToLeave: input.timeToLeave, cancellationAndReturnPolicyId: input.cancellationAndReturnPolicyId },
    },
    { apiName: this.apiName,...config });
  

  getWithNavigationProperties = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HostSettingWithNavigationPropertiesDto>({
      method: 'GET',
      url: `/api/app/host-settings/with-navigation-properties/${id}`,
    },
    { apiName: this.apiName,...config });
  

  isHostHaveHostSetting = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'GET',
      url: '/api/app/host-settings/is-host-have-host-setting',
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: HostSettingUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HostSettingDto>({
      method: 'PUT',
      url: `/api/app/host-settings/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  updateHostSetting = (CancellationAndReturnPolicyIds: number[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, HostSettingDto>({
      method: 'PUT',
      url: '/api/app/host-settings/update-host-setting',
      body: CancellationAndReturnPolicyIds,
    },
    { apiName: this.apiName,...config });
  

  updateTimeToEnterToLeave = (TimeToEnter: string, TimeToLeave: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HostSettingDto>({
      method: 'PUT',
      url: '/api/app/host-settings/Updatet-Time-To-Enter-To-Leave',
      params: { timeToEnter: TimeToEnter, timeToLeave: TimeToLeave },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
