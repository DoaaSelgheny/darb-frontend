import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { GuestProfileDto, UpdateGuestProfileDto } from '../profiles/dto/models';

@Injectable({
  providedIn: 'root',
})
export class GuestProfileService {
  apiName = 'Default';
  

  getGuestProfileData = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, GuestProfileDto>({
      method: 'GET',
      url: '/api/app/guest-profile/guest-profile-data',
    },
    { apiName: this.apiName,...config });
  

  updateGuestProfileByInput = (input: UpdateGuestProfileDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/app/guest-profile/guest-profile',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
