import type { Gender } from '../gender.enum';
import type { Gender, UserInterestExperienceDto, UserInterestVacationHomeDto } from '../models';
import type { ProfilePictureSourceDto } from '../../volo/abp/account/models';

export interface GuestProfileDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  gender?: Gender;
  quaternaryName?: string;
  interestExperiences: UserInterestExperienceDto[];
  interestVacations: UserInterestVacationHomeDto[];
  profilePicture: ProfilePictureSourceDto;
  hyyakId?: string;
  isYakeenVerified: boolean;
}

export interface HostProfileDto {
  id?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  gender: number;
  quaternaryName?: string;
  profilePicture?: string;
  about?: string;
  hyyakId?: string;
}

export interface UpdateGuestProfileDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  gender: number;
  interestExperiences: number[];
  interestVacations: number[];
}

export interface UpdateHostProfileDto {
  id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  gender: number;
  about: string;
  profilePicture: string;
}
