import type { GuestExperienceDto, GuestVacationHomeDto } from '../guests/models';
import type { PagedAndSortedResultRequestDto, PagedResultRequestDto } from '@abp/ng.core';
import type { CategoryType } from '../categories/category-type.enum';
import type { CategoryType } from '../categories/models';
import type { VacationHomePublishStatus } from '../vacation-homes/vacation-home-publish-status.enum';
import type { VacationHomePublishStatus } from '../vacation-homes/models';

export interface CombinedServiceDto {
  vacationHome: GuestVacationHomeDto;
  experience: GuestExperienceDto;
  isVacationHome: boolean;
}

export interface CombinedServicesFilter extends PagedAndSortedResultRequestDto {
  type?: CategoryType;
  typeId?: number;
  cityId?: number;
  districtId?: number;
  dateFrom?: string;
  dateTo?: string;
}

export interface GetCombinedServicesReponseDto {
  items: CombinedServiceDto[];
  totalCount: number;
  vacationHomesCount: number;
  experiencesCount: number;
}

export interface DistinguishServiceFilterDto extends PagedResultRequestDto {
  keyword?: string;
}

export interface DistinguishVacationHomeDto {
  id: number;
  name?: string;
  showOnHome: boolean;
  hostName?: string;
  hostPhoneNumber?: string;
  publishStatus: VacationHomePublishStatus;
}
