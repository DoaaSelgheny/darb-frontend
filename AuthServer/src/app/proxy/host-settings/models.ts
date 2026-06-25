import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { CancellationAndReturnPolicyDto } from '../cancellation-and-return-policies/models';

export interface GetHostSettingsInput extends GetHostSettingsInputBase {
}

export interface GetHostSettingsInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  timeToEnter?: string;
  timeToLeave?: string;
  cancellationAndReturnPolicyId?: number;
}

export interface HostSettingCreateDto extends HostSettingCreateDtoBase {
}

export interface HostSettingCreateDtoBase {
  timeToEnter: string;
  timeToLeave: string;
  cancellationAndReturnPolicyIds: number[];
}

export interface HostSettingDto extends HostSettingDtoBase {
}

export interface HostSettingDtoBase extends FullAuditedEntityDto<number> {
  timeToEnter?: string;
  timeToLeave?: string;
  concurrencyStamp?: string;
}

export interface HostSettingExcelDownloadDto extends HostSettingExcelDownloadDtoBase {
}

export interface HostSettingExcelDownloadDtoBase {
  downloadToken?: string;
  filterText?: string;
  timeToEnter?: string;
  timeToLeave?: string;
  cancellationAndReturnPolicyId?: number;
}

export interface HostSettingUpdateDto extends HostSettingUpdateDtoBase {
}

export interface HostSettingUpdateDtoBase {
  timeToEnter: string;
  timeToLeave: string;
  cancellationAndReturnPolicyIds: number[];
  concurrencyStamp?: string;
}

export interface HostSettingWithNavigationPropertiesDto extends HostSettingWithNavigationPropertiesDtoBase {
}

export interface HostSettingWithNavigationPropertiesDtoBase {
  hostSetting: HostSettingDto;
  cancellationAndReturnPolicies: CancellationAndReturnPolicyDto[];
}
