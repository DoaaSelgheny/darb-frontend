import type { Gender } from './gender.enum';

export interface ExtendedProfileDto {
  email?: string;
  emailConfirmed: boolean;
  name?: string;
  idFullName?: string;
  breif?: string;
  surname?: string;
  phoneNumber?: string;
  phoneNumberConfirmed: boolean;
  isExternal: boolean;
  gender?: Gender;
  hyyakId?: string;
  countryCode?: string;
  countryKey?: string;
}

export interface ProfileGuestUpdateDto {
  name?: string;
  surname?: string;
  gender?: Gender;
  email: string;
  phoneNumber: string;
  userInterestVacationHome: number[];
  userInterestExperience: number[];
}

export interface ProfileHostUpdateDto {
  name: string;
  surname: string;
  breif?: string;
  gender: Gender;
}

export interface UserInterestExperienceDto {
  id: number;
  name?: string;
  description?: string;
  iconName?: string;
  iconPath?: string;
  isSelected: boolean;
}

export interface UserInterestVacationHomeDto {
  id: number;
  arName?: string;
  enName?: string;
  description?: string;
  iconPath?: string;
  iconName?: string;
  isSelected: boolean;
}
