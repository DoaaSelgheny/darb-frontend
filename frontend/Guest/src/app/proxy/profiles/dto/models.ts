import type {  UserInterestExperienceDto, UserInterestVacationHomeDto } from '../models';
import type { ProfilePictureSourceDto } from '../../volo/abp/account/models';
import { Gender } from '../gender.enum';

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
  hasSubmittedIdentityDocuments: boolean;
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
