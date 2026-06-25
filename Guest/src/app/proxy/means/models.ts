import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { MeanType } from './mean-type.enum';

export interface GetMeansInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  name?: string;
  type: MeanType;
}

export interface MeanCreateDto {
  name: string;
  type: MeanType;
}

export interface MeanDto extends FullAuditedEntityDto<number> {
  name?: string;
  symbol?: string;
  type: MeanType;
}

export interface MeanExcelDownloadDto {
  downloadToken?: string;
  filterText?: string;
  name?: string;
}

export interface MeanUpdateDto {
  name: string;
  type: MeanType;
}
