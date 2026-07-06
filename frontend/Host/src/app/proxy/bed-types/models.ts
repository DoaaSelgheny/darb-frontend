import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface BedTypeCreateDto extends BedTypeCreateDtoBase {
}

export interface BedTypeCreateDtoBase {
  nameAr: string;
  nameEn: string;
}

export interface BedTypeDto extends BedTypeDtoBase {
}

export interface BedTypeDtoBase extends FullAuditedEntityDto<string> {
  nameAr?: string;
  nameEn?: string;
  concurrencyStamp?: string;
}

export interface BedTypeExcelDownloadDto extends BedTypeExcelDownloadDtoBase {
}

export interface BedTypeExcelDownloadDtoBase {
  downloadToken?: string;
  filterText?: string;
  nameAr?: string;
  nameEn?: string;
}

export interface BedTypeUpdateDto extends BedTypeUpdateDtoBase {
}

export interface BedTypeUpdateDtoBase {
  nameAr: string;
  nameEn: string;
  concurrencyStamp?: string;
}

export interface GetBedTypesInput extends GetBedTypesInputBase {
}

export interface GetBedTypesInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  nameAr?: string;
  nameEn?: string;
}
