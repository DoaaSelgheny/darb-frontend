import type { CancellationAndReturnPolicyType } from './cancellation-and-return-policy-type.enum';
import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CancellationAndReturnPolicyCreateDto {
  nameEn: string;
  nameAr: string;
  code: string;
  descriptionEn: string;
  descriptionAr: string;
  cancellationDeadlineDaysCount: number;
  type: CancellationAndReturnPolicyType;
}

export interface CancellationAndReturnPolicyDto extends CancellationAndReturnPolicyDtoBase {
}

export interface CancellationAndReturnPolicyDtoBase extends EntityDto<number> {
  nameEn?: string;
  nameAr?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  code?: string;
  concurrencyStamp?: string;
  isRecommended?: boolean;
}

export interface CancellationAndReturnPolicyExcelDownloadDto extends CancellationAndReturnPolicyExcelDownloadDtoBase {
}

export interface CancellationAndReturnPolicyExcelDownloadDtoBase {
  downloadToken?: string;
  filterText?: string;
  nameEn?: string;
  nameAr?: string;
  code?: string;
}

export interface CancellationAndReturnPolicyUpdateDto {
  nameEn: string;
  nameAr: string;
  code: string;
  concurrencyStamp?: string;
  cancellationDeadlineDaysCount: number;
  type: CancellationAndReturnPolicyType;
}

export interface GetCancellationAndReturnPoliciesInput extends GetCancellationAndReturnPoliciesInputBase {
}

export interface GetCancellationAndReturnPoliciesInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  nameEn?: string;
  nameAr?: string;
  code?: string;
}
