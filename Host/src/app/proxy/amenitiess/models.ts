import type { EntityDto, FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { AmenitiesType } from './amenities-type.enum';

export interface AmenitiesCreateDto extends AmenitiesCreateDtoBase {
}

export interface AmenitiesCreateDtoBase {
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  symbol: string;
  status: boolean;
}

export interface AmenitiesDto extends AmenitiesDtoBase {
}

export interface AmenitiesDtoBase extends FullAuditedEntityDto<string> {
  nameAr?: string;
  nameEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  symbol?: string;
  status: boolean;
  isMainFacility: boolean;
  amenitiesType: AmenitiesType;
  amenitiesDto: SubAmenitiesDto;
  concurrencyStamp?: string;
}

export interface AmenitiesExcelDownloadDto extends AmenitiesExcelDownloadDtoBase {
}

export interface AmenitiesExcelDownloadDtoBase {
  downloadToken?: string;
  filterText?: string;
  nameAr?: string;
  nameEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  symbol?: string;
  status?: boolean;
}

export interface AmenitiesUpdateDto extends AmenitiesUpdateDtoBase {
}

export interface AmenitiesUpdateDtoBase {
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  symbol: string;
  status: boolean;
  concurrencyStamp?: string;
}

export interface GetAmenitiessInput extends GetAmenitiessInputBase {
}

export interface GetAmenitiessInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  nameAr?: string;
  nameEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  symbol?: string;
  status?: boolean;
  isMainFacility?: boolean;
}

export interface LightAmenitiesDto extends EntityDto<string> {
  nameAr?: string;
  nameEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  status: boolean;
  isMainFacility: boolean;
  symbol?: string;
  amenitiesType: AmenitiesType;
  amenitiesDto: SubAmenitiesDto;
}

export interface LightSubAmenitiesDto extends EntityDto<string> {
  nameAr?: string;
  nameEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  status: boolean;
  isMainFacility: boolean;
}

export interface SubAmenitiesDto extends SubAmenitiesDtoBase {
}

export interface SubAmenitiesDtoBase extends FullAuditedEntityDto<string> {
  nameAr?: string;
  nameEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  symbol?: string;
  status: boolean;
  isMainFacility: boolean;
  concurrencyStamp?: string;
}
