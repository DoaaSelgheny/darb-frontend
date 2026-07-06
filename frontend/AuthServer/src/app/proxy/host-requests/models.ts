import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { RequestType } from '../shared/enums/request-type.enum';
import type { RequestStatus, RequestType } from '../shared/enums/models';
import type { RequestStatus } from '../shared/enums/request-status.enum';
import type { VacationHomeDto } from '../vacation-homes/models';
import type { ExperienceDto } from '../experiences/models';

export interface GetHostRequestsInput extends GetHostRequestsInputBase {
}

export interface GetHostRequestsInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  hostName?: string;
  hostPhone?: string;
  requestType?: RequestType;
  requestStatus?: RequestStatus;
  vacationHomeId?: number;
  experienceId?: number;
  isVacationHome: boolean;
}

export interface HostRequestDto extends HostRequestDtoBase {
}

export interface HostRequestDtoBase extends FullAuditedEntityDto<string> {
  hostName?: string;
  hostPhone?: string;
  requestType: RequestType;
  requestStatus: RequestStatus;
  vacationHomeId?: number;
  experienceId?: number;
  concurrencyStamp?: string;
}

export interface HostRequestWithNavigationPropertiesDto extends HostRequestWithNavigationPropertiesDtoBase {
}

export interface HostRequestWithNavigationPropertiesDtoBase {
  hostRequest: HostRequestDto;
  vacationHome: VacationHomeDto;
  experience: ExperienceDto;
}
