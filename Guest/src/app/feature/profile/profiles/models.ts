import type { DateType } from './date-type.enum';
import type { Gender } from './gender.enum';
import type { YakeenVerificationType } from '../account-verifications/enum/yakeen-verification-type.enum';

export interface ExtendedProfileDto {
  email?: string;
  emailConfirmed: boolean;
  name?: string;
  breif?: string;
  surname?: string;
  phoneNumber?: string;
  phoneNumberConfirmed: boolean;
  isExternal: boolean;
  isVerifiedBy3rdParty: boolean;
  nationalID?: string;
  isDocumented?: boolean;
  birthDateType?: DateType;
  dateOfBirth?: string;
  gender?: Gender;
  yakeenVerificationType?: YakeenVerificationType;
  hyyakId?: string;
  countryCode?: string;
  countryKey?: string;
}

export interface ProfileGuestUpdateDto {
  nationalID?: string;
  name?: string;
  surname?: string;
  dateOfBirth?: string;
  gender?: Gender;
  yakeenVerificationType?: YakeenVerificationType;
  email: string;
  phoneNumber: string;
  countryCode?: string;
  userInterestVacationHome: number[];
  userInterestExperience: number[];
}

export interface ProfileHostUpdateDto {
  breif?: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
}

export interface UserInterestExperienceDto {
  id: number;
  name?: string;
  description?: string;
  icon?: string;
  isSelected: boolean;
}

export interface UserInterestVacationHomeDto {
  id: number;
  name?: string;
  description?: string;
  icon?: string;
  isSelected: boolean;
}
