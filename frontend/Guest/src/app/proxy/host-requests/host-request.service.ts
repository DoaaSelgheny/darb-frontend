import type { GetHostRequestsInput, HostRequestDto, HostRequestWithNavigationPropertiesDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { RequestStatus } from '../shared/enums/request-status.enum';
import type { DownloadTokenResultDto, LookupDto, LookupRequestDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class HostRequestService {
  apiName = 'Default';
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HostRequestDto>({
      method: 'GET',
      url: `/api/app/host-requests/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/host-requests/download-token',
    },
    { apiName: this.apiName,...config });
  

  getExperienceLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<number>>>({
      method: 'GET',
      url: '/api/app/host-requests/experience-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetHostRequestsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<HostRequestWithNavigationPropertiesDto>>({
      method: 'GET',
      url: '/api/app/host-requests',
      params: { filterText: input.filterText, hostName: input.hostName, hostPhone: input.hostPhone, requestType: input.requestType, requestStatus: input.requestStatus, vacationHomeId: input.vacationHomeId, experienceId: input.experienceId, isVacationHome: input.isVacationHome, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getVacationHomeLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<number>>>({
      method: 'GET',
      url: '/api/app/host-requests/vacation-home-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getWithNavigationProperties = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HostRequestWithNavigationPropertiesDto>({
      method: 'GET',
      url: `/api/app/host-requests/with-navigation-properties/${id}`,
    },
    { apiName: this.apiName,...config });
  

  takeAction = (id: string, RequestStatus: RequestStatus, rejectionReason: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'PATCH',
      url: `/api/app/host-requests/take-action/${id}`,
      params: { requestStatus: RequestStatus, rejectionReason },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
