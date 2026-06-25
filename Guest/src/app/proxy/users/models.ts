import type { AccountVerificationStatus } from '../account-verifications/enum/account-verification-status.enum';
import type { YakeenVerificationType } from '../account-verifications/enum/yakeen-verification-type.enum';

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
