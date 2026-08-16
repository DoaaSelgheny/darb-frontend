import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { CountryDto } from '../countries/models';

export interface CityCreateDto {
  nameAr: string;
  nameEn: string;
  lat?: number;
  lng?: number;
  countryId: number;
  regionId?: number;
}

export interface CityDto extends EntityDto<number> {
  name?: string;
  countryId: number;
  regionId?: number;
  lat?: number;
  lng?: number;
  concurrencyStamp?: string;
}

export interface CityExcelDownloadDto {
  downloadToken?: string;
  filterText?: string;
  name?: string;
  countryId?: number;
}

export interface CityUpdateDto {
  nameAr: string;
  nameEn: string;
  countryId: number;
  regionId?: number;
  lat?: number;
  lng?: number;
  concurrencyStamp?: string;
}

export interface CityWithNavigationPropertiesDto {
  city: CityDto;
  country: CountryDto;
}

export interface GetCitiesInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  name?: string;
  countryId?: number;
  regionId?: number;
  lat?: number;
  lng?: number;
}
