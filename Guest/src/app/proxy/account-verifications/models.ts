import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { AccountVerificationStatus } from './enum/account-verification-status.enum';
import type { AccountVerificationType } from './enum/account-verification-type.enum';
import type { RejectionType } from './enum/rejection-type.enum';
import type { YakeenVerificationType } from './enum/yakeen-verification-type.enum';
import type { HostType } from './host-type.enum';
import type { Action } from './action.enum';

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
  rejectionType?: RejectionType;
  rejectionReason?: string;
  idFullNameEn?: string;
  idFullNameAr?: string;
  yakeenVerificationType: YakeenVerificationType;
  isVerifiedMinistryTourism: boolean;
  issueDate?: string;
  expiryDate?: string;
  statusName?: string;
  permitNumber?: string;
  vacationHomeCommissionPercentage: number;
  experienceCommissionPercentage: number;
  userPhoneNumber?: string;
  hostType: HostType;
  taxRegistrationNumber?: string;
  licenceNumber?: string;
  commercialRegistrationNumber?: string;
  hostNameAr?: string;
  hostNameEn?: string;
}

export interface AccountVerificationTakeActionDto {
  action: Action;
  vacationHomeCommissionPercentage: number;
  experienceCommissionPercentage: number;
  rejectionType?: RejectionType;
  rejectionReason?: string;
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

export interface MinistryTourismVerificationCreateDto {
  licenseNumber?: string;
  crNumber?: string;
  permitNumber?: string;
}

export interface UserVerificationRequestDto {
  ibanNumber?: string;
  accountNumber?: string;
  bankName?: string;
  licenseFile?: string;
  attachedSaudiID?: string;
  type: AccountVerificationType;
  taxRegistrationNumber?: string;
}

export interface VerifiedMinistryTourismDto {
  isVerifiedMinistryTourism: boolean;
  issueDate?: string;
  expiryDate?: string;
  statusName?: string;
  permitNumber?: string;
  commercialRegistrationNumber?: string;
  licenceNumber?: string;
  hostNameAr?: string;
  hostNameEn?: string;
  hostType: HostType;
}

export interface YakeenVerificationDto {
  status: boolean;
  name?: string;
}
