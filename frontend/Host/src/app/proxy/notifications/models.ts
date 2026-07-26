import type { AuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { NotificationType } from '../notificaitons/notification-type.enum';
import type { NotificationStatus } from '../notificaitons/notification-status.enum';

export interface GetNotificationsInput extends GetNotificationsInputBase {
}

export interface GetNotificationsInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  type?: NotificationType;
  status?: NotificationStatus;
}

export interface NotificationCreateDto extends NotificationCreateDtoBase {
}

export interface NotificationCreateDtoBase {
  type: NotificationType;
  content: string;
  status: NotificationStatus;
  errorMessage?: string;
}

export interface NotificationDto extends NotificationDtoBase {
}

export interface NotificationDtoBase extends AuditedEntityDto<number> {
  type: NotificationType;
  content?: string;
  status: NotificationStatus;
  errorMessage?: string;
}

export interface NotificationExcelDownloadDto extends NotificationExcelDownloadDtoBase {
}

export interface NotificationExcelDownloadDtoBase {
  downloadToken?: string;
  filterText?: string;
  type?: NotificationType;
  status?: NotificationStatus;
}

export interface NotificationUpdateDto extends NotificationUpdateDtoBase {
}

export interface NotificationUpdateDtoBase {
  type: NotificationType;
  content: string;
  status: NotificationStatus;
  errorMessage?: string;
}

export interface OtpDeliveryResult {
  success: boolean;
  errorMessage?: string;
}
