import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CurrencyCreateDto {
  name: string;
  code?: string;
  rate: number;
  status: boolean;
}

export interface CurrencyDto extends EntityDto<number> {
  name?: string;
  code?: string;
  rate: number;
  status: boolean;
}

export interface CurrencyExcelDownloadDto {
  downloadToken?: string;
  filterText?: string;
  name?: string;
  code?: string;
  rateMin?: number;
  rateMax?: number;
  status?: boolean;
}

export interface CurrencyUpdateDto {
  name: string;
  code?: string;
  rate: number;
  status: boolean;
}

export interface GetCurrenciesInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  name?: string;
  code?: string;
  rateMin?: number;
  rateMax?: number;
  status?: boolean;
}
