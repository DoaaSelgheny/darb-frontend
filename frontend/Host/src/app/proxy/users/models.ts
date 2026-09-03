import type { UserType } from '../shared/enums/user-type.enum';
import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { AccountVerificationStatus } from '../account-verifications/enum/account-verification-status.enum';

export interface UserInformationDto {
  id?: string;
  accountVerificationId?: string;
  name?: string;
  userType?: UserType;
  email?: string;
  phoneNumber?: string;
  creationTime?: string;
  hasSubmittedIdentityDocuments?: boolean;
}

export interface UserInformationFilterDto extends PagedAndSortedResultRequestDto {
  search?: string;
}

export interface UserVerificationInfoDto {
  hyyakId?: string;
  hasSubmittedIdentityDocuments: boolean;
  status?: AccountVerificationStatus;
  iban?: string;
  shamBankAccount?: string;
  shamBankAccountImage?: string;
}

export interface UserSummaryDto {
  name?: string;
  phoneNumber?: string;
}
