import type { ContactUs } from '../shared/enums/contact-us.enum';
import type { ContactUs } from '../shared/enums/models';
import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface ContactusCreateDto extends ContactusCreateDtoBase {
}

export interface ContactusCreateDtoBase {
  name: string;
  email?: string;
  message?: string;
  phoneNumber?: string;
  topicType?: ContactUs;
}

export interface ContactusDto extends ContactusDtoBase {
}

export interface ContactusDtoBase extends FullAuditedEntityDto<string> {
  name?: string;
  email?: string;
  message?: string;
  phoneNumber?: string;
  individual: boolean;
  topicType?: ContactUs;
  concurrencyStamp?: string;
}

export interface ContactusExcelDownloadDto extends ContactusExcelDownloadDtoBase {
}

export interface ContactusExcelDownloadDtoBase {
  downloadToken?: string;
  filterText?: string;
  name?: string;
  email?: string;
  message?: string;
  phoneNumber?: string;
  individual?: boolean;
  topicType?: ContactUs;
}

export interface ContactusUpdateDto extends ContactusUpdateDtoBase {
}

export interface ContactusUpdateDtoBase {
  name: string;
  email?: string;
  message?: string;
  phoneNumber?: string;
  individual: boolean;
  topicType?: ContactUs;
  concurrencyStamp?: string;
}

export interface GetContactusesInput extends GetContactusesInputBase {
}

export interface GetContactusesInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  name?: string;
  email?: string;
  message?: string;
  phoneNumber?: string;
  individual?: boolean;
  topicType?: ContactUs;
}
