import { CategoryType } from '@proxy/categories';
import type { GuestExperienceDto, GuestVacationHomeDto } from '../guests/models';
import type { PagedAndSortedResultRequestDto, PagedResultRequestDto } from '@abp/ng.core';
import { VacationHomePublishStatus } from '@proxy/vacation-homes';

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
