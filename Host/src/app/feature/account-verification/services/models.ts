import type { AccountVerificationStatus } from './enum/account-verification-status.enum';
import type { AccountVerificationType } from './enum/account-verification-type.enum';
import type { YakeenVerificationType } from './enum/yakeen-verification-type.enum';
import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface AccountVerificationCreateDto {
  saudiID: string;
  dateOfBirth?: string;
  accountHolder: string;
  ibanNumber?: string;
  accountNumber?: string;
  bankName?: string;
  licenseFile?: string;
  attachedSaudiID?: string;
  status: AccountVerificationStatus;
  type: AccountVerificationType;
  iqama?: string;
  passport?: string;
  yakeenVerificationType: YakeenVerificationType;
}

export interface AccountVerificationDto extends FullAuditedEntityDto<string> {
  saudiID?: string;
  dateOfBirth?: string;
  accountHolder?: string;
  ibanNumber?: string;
  accountNumber?: string;
  bankName?: string;
  licenseFile?: string;
  attachedSaudiID?: string;
  status: AccountVerificationStatus;
  type: AccountVerificationType;
  isYakeenVerified: boolean;
  iqama?: string;
  passport?: string;
  yakeenVerificationType: YakeenVerificationType;
}

export interface AccountVerificationExcelDownloadDto {
  downloadToken?: string;
  filterText?: string;
  saudiID?: string;
  dateOfBirthMin?: string;
  dateOfBirthMax?: string;
  accountHolder?: string;
  ibanNumber?: string;
  accountNumber?: string;
  bankName?: string;
  licenseFile?: string;
  attachedSaudiID?: string;
  status?: AccountVerificationStatus;
  type?: AccountVerificationType;
  iqama?: string;
  passport?: string;
  yakeenVerificationType?: YakeenVerificationType;
}

export interface AccountVerificationUpdateDto {
  saudiID: string;
  dateOfBirth?: string;
  accountHolder: string;
  ibanNumber?: string;
  accountNumber?: string;
  bankName?: string;
  licenseFile?: string;
  attachedSaudiID?: string;
  status: AccountVerificationStatus;
  type: AccountVerificationType;
  iqama?: string;
  passport?: string;
  yakeenVerificationType: YakeenVerificationType;
}

export interface GetAccountVerificationsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  saudiID?: string;
  dateOfBirthMin?: string;
  dateOfBirthMax?: string;
  accountHolder?: string;
  ibanNumber?: string;
  accountNumber?: string;
  bankName?: string;
  licenseFile?: string;
  attachedSaudiID?: string;
  status?: AccountVerificationStatus;
  type?: AccountVerificationType;
  iqama?: string;
  passport?: string;
  yakeenVerificationType?: YakeenVerificationType;
}

export interface YakeenVerificationDto {
  status: boolean;
  name?: string;
}
