import type {
  ExtendedProfileDto,
  ProfileGuestUpdateDto,
  ProfileHostUpdateDto,
  UserInterestExperienceDto,
  UserInterestVacationHomeDto,
} from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { ProfileDto, ProfilePictureSourceDto } from '@proxy/volo/abp/account/models';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  apiName = 'Default';

  get = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProfileDto>(
      {
        method: 'GET',
        url: '/api/app/profile',
      },
      { apiName: this.apiName, ...config },
    );

  getGuestProfile = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExtendedProfileDto>(
      {
        method: 'GET',
        url: '/api/app/profile/get-profile',
      },
      { apiName: this.apiName, ...config },
    );

  getProfilePictureSource = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProfilePictureSourceDto>(
      {
        method: 'GET',
        url: '/api/app/profile/profile-picture',
      },
      { apiName: this.apiName, ...config },
    );

  getUserInterestExperience = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, UserInterestExperienceDto[]>(
      {
        method: 'GET',
        url: '/api/app/profile/user-interest-experience',
      },
      { apiName: this.apiName, ...config },
    );

  getUserInterestVacationHome = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, UserInterestVacationHomeDto[]>(
      {
        method: 'GET',
        url: '/api/app/profile/user-interest-vacation-home',
      },
      { apiName: this.apiName, ...config },
    );

  setProfilePicture = (image: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'PUT',
        url: '/api/app/profile/profile-picture',
        body: image,
      },
      { apiName: this.apiName, ...config },
    );

  updateGuest = (input: ProfileGuestUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProfileDto>(
      {
        method: 'PUT',
        url: '/api/app/profile/update-guest',
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  updateHost = (input: ProfileHostUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProfileDto>(
      {
        method: 'PUT',
        url: '/api/app/profile/update-host',
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  updateProfileEmailByEmail = (email: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProfileDto>(
      {
        method: 'PUT',
        url: '/api/app/profile/update-profile-email',
        params: { email },
      },
      { apiName: this.apiName, ...config },
    );

  updateProfileNumberByPhoneNumber = (phoneNumber: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProfileDto>(
      {
        method: 'PUT',
        url: '/api/app/profile/update-profile-phone-number',
        params: { phoneNumber },
      },
      { apiName: this.apiName, ...config },
    );


    deleteProfilePicture = (config?: Partial<Rest.Config>) =>
      this.restService.request<any, void>(
        {
          method: 'delete',
          url: '/api/app/profile/profile-picture',
        },
        { apiName: this.apiName, ...config },
      );

  constructor(private restService: RestService) {}
}
