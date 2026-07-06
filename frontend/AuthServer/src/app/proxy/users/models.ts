import type { UserType } from '../shared/enums/user-type.enum';
import type { UserType } from '../shared/enums/models';
import type { YakeenVerificationType } from '../account-verifications/enum/yakeen-verification-type.enum';
import type { AccountVerificationStatus, YakeenVerificationType } from '../account-verifications/enum/models';
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
  yakeenVerificationType?: YakeenVerificationType;
  idNumber?: string;
  isYakeenVerified?: boolean;
}

export interface UserInformationFilterDto extends PagedAndSortedResultRequestDto {
}

export interface UserVerificationInfoDto {
  hyyakId?: string;
  isVerifiedMinistryTourism: boolean;
  isYakeenVerified: boolean;
  status?: AccountVerificationStatus;
  yakeenVerificationType?: YakeenVerificationType;
}

export interface UserSummaryDto {
  name?: string;
  nationalId?: string;
  phoneNumber?: string;
}
