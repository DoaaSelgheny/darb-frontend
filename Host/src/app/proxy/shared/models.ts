import type { CityDto } from '../cities/models';
import type { DistrictDto } from '../districts/models';
import type { PagedResultRequestDto } from '@abp/ng.core';

export interface AgreementInformationDto {
  hostName?: string;
  email?: string;
  phoneNumber?: string;
  city: CityDto;
  district: DistrictDto;
  signingAgreement: boolean;
  signingAgreementDate?: string;
  commissionPercentage?: number;
}

export interface DownloadTokenResultDto extends DownloadTokenResultDtoBase {
}

export interface DownloadTokenResultDtoBase {
  token?: string;
}

export interface LookupDto<TKey> extends LookupDtoBase<TKey> {
}

export interface LookupDtoBase<TKey> {
  id: TKey;
  displayName?: string;
}

export interface LookupRequestDto extends LookupRequestDtoBase {
}

export interface LookupRequestDtoBase extends PagedResultRequestDto {
  filter?: string;
}
