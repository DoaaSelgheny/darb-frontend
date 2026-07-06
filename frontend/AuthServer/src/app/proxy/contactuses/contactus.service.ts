import type { ContactusCreateDto, ContactusDto, ContactusExcelDownloadDto, ContactusUpdateDto, GetContactusesInput } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DownloadTokenResultDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ContactusService {
  apiName = 'Default';
  

  create = (input: ContactusCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ContactusDto>({
      method: 'POST',
      url: '/api/app/contactuses',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/contactuses/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ContactusDto>({
      method: 'GET',
      url: `/api/app/contactuses/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/contactuses/download-token',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetContactusesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ContactusDto>>({
      method: 'GET',
      url: '/api/app/contactuses',
      params: { filterText: input.filterText, name: input.name, email: input.email, message: input.message, phoneNumber: input.phoneNumber, individual: input.individual, topicType: input.topicType, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: ContactusExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/contactuses/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, name: input.name, email: input.email, message: input.message, phoneNumber: input.phoneNumber, individual: input.individual, topicType: input.topicType },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: ContactusUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ContactusDto>({
      method: 'PUT',
      url: `/api/app/contactuses/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
