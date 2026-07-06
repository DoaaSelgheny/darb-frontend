import type { GetRatingDetailsHostDto, GetRatingHostDto, RatingsHostFilter } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RatingsHostService {
  apiName = 'Default';
  

  getRatingDetailsById = (Id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetRatingDetailsHostDto>({
      method: 'GET',
      url: `/api/app/ratings-host/rating-details/${Id}`,
    },
    { apiName: this.apiName,...config });
  

  getRatingListByFilter = (filter: RatingsHostFilter, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<GetRatingHostDto>>({
      method: 'GET',
      url: '/api/app/ratings-host/rating-list',
      params: { filterText: filter.filterText, serviceType: filter.serviceType, hasGuestOpinion: filter.hasGuestOpinion, sorting: filter.sorting, skipCount: filter.skipCount, maxResultCount: filter.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  reply = (Id: number, reply: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/ratings-host/reply/${Id}`,
      params: { reply },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
