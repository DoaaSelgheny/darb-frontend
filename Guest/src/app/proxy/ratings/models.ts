import type { ServiceType } from './service-type.enum';
import type { GuestPublishStatus } from './guest-publish-status.enum';
import type { HostPublishStatus } from './host-publish-status.enum';
import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateFacilityRatingDto {
  facilityId: number;
  ratingValue: number;
}

export interface CreateRatingDto {
  reservationId: number;
  guestOpinion?: string;
  facilityRatings: CreateFacilityRatingDto[];
}

export interface GetFacilityDto {
  id: number;
  nameAr?: string;
  nameEn?: string;
  serviceType: ServiceType;
}

export interface GetFacilityRatingDto {
  id: number;
  nameAr?: string;
  nameEn?: string;
  rating: number;
}

export interface GetRatingAdminDto {
  id: number;
  isRead: boolean;
  categoryName?: string;
  reservationNumber: number;
  guestName?: string;
  guestPublishStatus: GuestPublishStatus;
  hostName?: string;
  hostPublishStatus: HostPublishStatus;
  rating: number;
  serviceType: ServiceType;
  creationTime?: string;
}

export interface GetRatingDetailsAdminDto {
  id: number;
  experienceId?: number;
  experienceName?: string;
  vacationHomeId?: number;
  vacationHomeName?: string;
  categoryName?: string;
  ratingCount: number;
  averageRating?: number;
  reservationNumber: number;
  serialNumber?: string;
  numberOfReservations: number;
  guestName?: string;
  guestPhoneNumber?: string;
  reservationDate?: string;
  numberOfDaysOrPeople: number;
  guestPublishStatus: GuestPublishStatus;
  guestOpinion?: string;
  hostName?: string;
  hostPhoneNumber?: string;
  hostPublishStatus: HostPublishStatus;
  hostReply?: string;
  serviceType: ServiceType;
  serviceId: number;
  isRead: boolean;
  primaryImage?: string;
  guestAverageRating: number;
  facilityRatings: GetFacilityRatingDto[];
}

export interface GetRatingDetailsHostDto {
  id: number;
  experienceId?: number;
  experienceName?: string;
  vacationHomeId?: number;
  vacationHomeName?: string;
  categoryName?: string;
  ratingCount: number;
  averageRating?: number;
  reservationNumber: number;
  serialNumber?: string;
  publishDate?: string;
  numberOfReservations: number;
  numberOfDaysOrPeople: number;
  guestPublishStatus: GuestPublishStatus;
  guestOpinion?: string;
  hostPublishStatus: HostPublishStatus;
  hostReply?: string;
  serviceType: ServiceType;
  serviceId: number;
  isRead: boolean;
  primaryImage?: string;
  guestAverageRating: number;
  facilityRatings: GetFacilityRatingDto[];
}

export interface GetRatingHostDto {
  id: number;
  isRead: boolean;
  experienceId?: number;
  experienceName?: string;
  vacationHomeId?: number;
  vacationHomeName?: string;
  serviceName?: string;
  categoryName?: string;
  reservationNumber: number;
  guestName?: string;
  isGuestOpinionExits: boolean;
  rating: number;
  serviceType: ServiceType;
  creationTime?: string;
}

export interface RatingPopUpDto {
  reservationId?: number;
  serviceType?: ServiceType;
  name?: string;
  city?: string;
  district?: string;
  img?: string;
  ratingsCount: number;
  ratingsAverage: number;
}

export interface RatingsAdminFilter extends PagedAndSortedResultRequestDto {
  filterText?: string;
  guestPublishStatus?: GuestPublishStatus;
  hostPublishStatus?: HostPublishStatus;
}

export interface RatingsHostFilter extends PagedAndSortedResultRequestDto {
  filterText?: string;
  serviceType?: ServiceType;
  hasGuestOpinion?: boolean;
}

export interface ReviewDto {
  id: number;
  guestId?: string;
  guestProfilePicture?: string;
  guestOpinion?: string;
  guestName?: string;
  creationTime?: string;
  hostId?: string;
  hostReply?: string;
  hostProfilePicture?: string;
  hostName?: string;
  hostReplyDate?: string;
  serviceType: ServiceType;
  serviceId: number;
  averageRating: number;
}

export interface ReviewsRequestDto extends PagedAndSortedResultRequestDto {
  serviceId: number;
  serviceType: ServiceType;
}

export interface ServiceAverageRatingsListDto {
  facilityId: number;
  name?: string;
  averageRating: number;
  averageRatingBeforeRound: number;
}
