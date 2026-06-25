import type { ServiceAverageRatingsResponseDto } from './guest/models';
import type { CreateRatingDto, RatingPopUpDto, ReviewDto, ReviewsRequestDto } from './models';
import type { ServiceType } from './service-type.enum';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RatingsGuestService {
  apiName = 'Default';
  

  createRating = (request: CreateRatingDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/ratings-guest/rating',
      body: request,
    },
    { apiName: this.apiName,...config });
  

  getAverageRatingsByServiceIdAndServiceType = (serviceId: number, serviceType: ServiceType, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ServiceAverageRatingsResponseDto>({
      method: 'GET',
      url: `/api/app/ratings-guest/average-ratings/${serviceId}`,
      params: { serviceType },
    },
    { apiName: this.apiName,...config });
  

  getReservationIdForRating = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, RatingPopUpDto>({
      method: 'GET',
      url: '/api/app/ratings-guest/reservation-id-for-rating',
    },
    { apiName: this.apiName,...config });
  

  getReviewsByReqParams = (reqParams: ReviewsRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ReviewDto>>({
      method: 'GET',
      url: '/api/app/ratings-guest/reviews',
      params: { serviceId: reqParams.serviceId, serviceType: reqParams.serviceType, sorting: reqParams.sorting, skipCount: reqParams.skipCount, maxResultCount: reqParams.maxResultCount },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
