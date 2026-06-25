import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface BankDto extends EntityDto<number> {
  code?: string;
  nameAr?: string;
  nameEn?: string;
  bankCode?: string;
  bicCode?: string;
  concurrencyStamp?: string;
}

export interface GetBanksInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  nameAr?: string;
  nameEn?: string;
}
