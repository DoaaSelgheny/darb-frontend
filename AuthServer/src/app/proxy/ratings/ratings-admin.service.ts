import type { GuestPublishStatus } from './guest-publish-status.enum';
import type { HostPublishStatus } from './host-publish-status.enum';
import type { GetRatingAdminDto, GetRatingDetailsAdminDto, RatingsAdminFilter } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RatingsAdminService {
  apiName = 'Default';
  

  changeGuestPublishStatusByIdAndGuestPublishStatus = (Id: number, guestPublishStatus: GuestPublishStatus, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/ratings-admin/change-guest-publish-status/${Id}`,
      params: { guestPublishStatus },
    },
    { apiName: this.apiName,...config });
  

  changeHostPublishStatusByIdAndHostPublishStatus = (Id: number, hostPublishStatus: HostPublishStatus, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/ratings-admin/change-host-publish-status/${Id}`,
      params: { hostPublishStatus },
    },
    { apiName: this.apiName,...config });
  

  getRatingDetailsById = (Id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetRatingDetailsAdminDto>({
      method: 'GET',
      url: `/api/app/ratings-admin/rating-details/${Id}`,
    },
    { apiName: this.apiName,...config });
  

  getRatingListByFilter = (filter: RatingsAdminFilter, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<GetRatingAdminDto>>({
      method: 'GET',
      url: '/api/app/ratings-admin/rating-list',
      params: { filterText: filter.filterText, guestPublishStatus: filter.guestPublishStatus, hostPublishStatus: filter.hostPublishStatus, sorting: filter.sorting, skipCount: filter.skipCount, maxResultCount: filter.maxResultCount },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
