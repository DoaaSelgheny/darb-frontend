import type { GetNotificationsInput, NotificationCreateDto, NotificationDto, NotificationExcelDownloadDto, NotificationUpdateDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DownloadTokenResultDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  apiName = 'Default';
  

  create = (input: NotificationCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NotificationDto>({
      method: 'POST',
      url: '/api/app/notifications',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/notifications/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NotificationDto>({
      method: 'GET',
      url: `/api/app/notifications/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/notifications/download-token',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetNotificationsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<NotificationDto>>({
      method: 'GET',
      url: '/api/app/notifications',
      params: { filterText: input.filterText, type: input.type, status: input.status, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: NotificationExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/notifications/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, type: input.type, status: input.status },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: NotificationUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NotificationDto>({
      method: 'PUT',
      url: `/api/app/notifications/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
