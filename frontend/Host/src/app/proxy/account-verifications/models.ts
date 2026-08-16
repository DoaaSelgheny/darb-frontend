import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { IdentityDocumentType } from './enum/identity-document-type.enum';
import type { AccountVerificationStatus } from './enum/account-verification-status.enum';
import type { AccountVerificationType } from './enum/account-verification-type.enum';
import type { RejectionType } from './enum/rejection-type.enum';
import type { Action } from './action.enum';

export interface AccountVerificationDto extends FullAuditedEntityDto<string> {
  attachedSaudiIDFront?: string;
  attachedSaudiIDBack?: string;
  identityDocumentType?: IdentityDocumentType;
  status: AccountVerificationStatus;
  type: AccountVerificationType;
  hasSubmittedIdentityDocuments: boolean;
  rejectionType?: RejectionType;
  rejectionReason?: string;
  vacationHomeCommissionPercentage: number;
  experienceCommissionPercentage: number;
  userPhoneNumber?: string;
  userName?: string;
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
  attachedSaudiIDFront?: string;
  attachedSaudiIDBack?: string;
  status?: AccountVerificationStatus;
  type?: AccountVerificationType;
}

export interface SubmitIdentityVerificationDto {
  identityDocumentType: IdentityDocumentType;
  attachedSaudiIDFront: string;
  attachedSaudiIDBack?: string;
}

export interface UpdateAccountVerificationCommissionDto {
  vacationHomeCommissionPercentage: number;
  experienceCommissionPercentage: number;
}
