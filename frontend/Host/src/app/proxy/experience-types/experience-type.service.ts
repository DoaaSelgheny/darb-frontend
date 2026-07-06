import type { ActivateDeactivateExperienceTypeRequestDto, ExperienceTypeCreateDto, ExperienceTypeDto, ExperienceTypeExcelDownloadDto, ExperienceTypeUpdateDto, GetExperienceTypesInput } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { BlobDto } from '../files/models';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';
import type { DownloadTokenResultDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ExperienceTypeService {
  apiName = 'Default';
  

  activateDeactivate = (id: number, input: ActivateDeactivateExperienceTypeRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/experience-types/change-status/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  create = (input: ExperienceTypeCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceTypeDto>({
      method: 'POST',
      url: '/api/app/experience-types',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/experience-types/${id}`,
    },
    { apiName: this.apiName,...config });
  

  download = (fileName: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/api/app/experience-types/download/${fileName}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceTypeDto>({
      method: 'GET',
      url: `/api/app/experience-types/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/experience-types/download-token',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetExperienceTypesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ExperienceTypeDto>>({
      method: 'GET',
      url: '/api/app/experience-types',
      params: { filterText: input.filterText, name: input.name, description: input.description, icon: input.icon, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: ExperienceTypeExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/experience-types/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, name: input.name, imageName: input.imageName, imagePath: input.imagePath, description: input.description, iconName: input.iconName, iconPath: input.iconPath, serviceFeesPercentage: input.serviceFeesPercentage },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: ExperienceTypeUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceTypeDto>({
      method: 'PUT',
      url: `/api/app/experience-types/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  upload = (file: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BlobDto>({
      method: 'POST',
      url: '/api/app/experience-types/upload',
      body: file,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
