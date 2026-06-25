import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface DistrictDto extends EntityDto<number> {
  name?: string;
  cityId: number;
  concurrencyStamp?: string;
}

export interface GetDistrictsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  name?: string;
  cityId?: number;
}

export interface LocationDto {
  cityId?: number;
  cityName?: string;
  districtId?: number;
  districtName?: string;
  lat?: number;
  lng?: number;
}
