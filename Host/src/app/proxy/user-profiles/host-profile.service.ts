import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { HostProfileDto, UpdateHostProfileDto } from '../profiles/dto/models';

@Injectable({
  providedIn: 'root',
})
export class HostProfileService {
  apiName = 'Default';
  

  getHostProfileData = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, HostProfileDto>({
      method: 'GET',
      url: '/api/app/host-profile/host-profile-data',
    },
    { apiName: this.apiName,...config });
  

  updateHostProfileByInput = (input: UpdateHostProfileDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/app/host-profile/host-profile',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
