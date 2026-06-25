import type { ExperienceImageCreateDto, ExperienceImageDto, ExperienceImageUpdateDto, GetExperienceImageListInput, GetExperienceImagesInput } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExperienceImageService {
  apiName = 'Default';
  

  create = (input: ExperienceImageCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceImageDto>({
      method: 'POST',
      url: '/api/app/experience-images',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/experience-images/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceImageDto>({
      method: 'GET',
      url: `/api/app/experience-images/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetExperienceImagesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ExperienceImageDto>>({
      method: 'GET',
      url: '/api/app/experience-images',
      params: { experienceId: input.experienceId, filterText: input.filterText, experienceImageType: input.experienceImageType, imagePath: input.imagePath, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListByExperienceId = (input: GetExperienceImageListInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ExperienceImageDto>>({
      method: 'GET',
      url: '/api/app/experience-images/by-experience',
      params: { experienceId: input.experienceId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: ExperienceImageUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExperienceImageDto>({
      method: 'PUT',
      url: `/api/app/experience-images/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
