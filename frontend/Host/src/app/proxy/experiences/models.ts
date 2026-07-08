import type { VisibleStatus } from './visible-status.enum';
import type { ExperienceImageDto } from '../experience-images/models';
import type { ExperienceReservationType } from './experience-reservation-type.enum';
import type { ExperienceDatesType } from './experience-dates-type.enum';
import type { ReceptionTimeType } from './reception-time-type.enum';
import type { AttendanceType } from './attendance-type.enum';
import type { LanguageType } from './language-type.enum';
import type { SpecificTimeSlotDto } from '../schedule-time-slots/models';
import type { ScheduleDateDto } from '../schedule-dates/models';
import type { CityDto } from '../cities/models';
import type { DistrictDto } from '../districts/models';
import type { ExperienceTypeDto } from '../experience-types/models';
import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { ExperienceStatus } from './experience-status.enum';
import type { ExperienceReservationWay } from './experience-reservation-way.enum';
import type { CancellationAndReturnPolicyDto } from '../cancellation-and-return-policies/models';
import type { MeanDto } from '../means/models';

export interface DistinguishExperienceDto {
  id: number;
  name?: string;
  showOnHome: boolean;
  hostName?: string;
  hostPhoneNumber?: string;
  visibleStatus: VisibleStatus;
}

export interface ExpeirenceForGuestDto {
  id: number;
  name?: string;
  experienceImages: ExperienceImageDto[];
  primaryImage?: string;
  description?: string;
  moreDetails?: string;
  serialNumber?: string;
  experienceReservationType?: ExperienceReservationType;
  experienceDatesType?: ExperienceDatesType;
  receptionTimeType?: ReceptionTimeType;
  pricePerPerson: number;
  experienceTypeId: number;
  attendanceType?: AttendanceType;
  languageType?: LanguageType;
  specificTimeSlots: SpecificTimeSlotDto[];
  scheduleDates: ScheduleDateDto[];
}

export interface ExperienceCountDto {
  total: number;
  published: number;
  rejected: number;
  unPublished: number;
  underReview: number;
  unComplete: number;
  waitingModificationToCompleted: number;
}

export interface ExperienceCountTypesDto {
  total: number;
  experienceTypes: ExperienceTypeCount[];
}

export interface ExperienceDto extends ExperienceDtoBase {
  city: CityDto;
  districtObject: DistrictDto;
  checkInTime?: string;
  checkOutTime?: string;
  availableFrom?: string;
  availableTo?: string;
  isAvailableAllYear: boolean;
  serialNumber?: string;
  pricePerPerson: number;
  visibleStatus: VisibleStatus;
  experienceType: ExperienceTypeDto;
  signingAgreement: boolean;
  isPublished: boolean;
}

export interface ExperienceDtoBase extends FullAuditedEntityDto<number> {
  experienceDatesType?: ExperienceDatesType;
  receptionTimeType?: ReceptionTimeType;
  name?: string;
  experienceStatus: ExperienceStatus;
  district?: string;
  districtId?: number;
  postalCode?: string;
  lng?: number;
  lat?: number;
  description?: string;
  moreDetails?: string;
  experienceReservationType?: ExperienceReservationType;
  adultPrice?: number;
  childPrice?: number;
  numberOfHours: number;
  numberOfDays: number;
  basicPrice?: number;
  minNumberOfAdults: number;
  maxNumberOfAdults?: number;
  minNumberOfChildren?: number;
  maxNumberOfChildren?: number;
  pricePerPerson: number;
  experienceReservationWay?: ExperienceReservationWay;
  experienceTypeId: number;
  cityId?: number;
  experienceRefundTypeId?: number;
  rejectionReason?: string;
  attendanceType?: AttendanceType;
  concurrencyStamp?: string;
  mapLink?: string;
  cancellationAndReturnPolicyId?: number;
  cancellationAndReturnPolicy: CancellationAndReturnPolicyDto;
  userId?: string;
  currencyId: number;
  meanIds: number[];
  images: ExperienceImageDto[];
  specificTimeSlots: SpecificTimeSlotDto[];
  scheduleDates: ScheduleDateDto[];
  languageType?: LanguageType;
  currentStep: number;
  showOnHome: boolean;
  primaryImage?: string;
}

export interface ExperienceForGuestListItemDto {
  id: number;
  name?: string;
  experienceImages: ExperienceImageDto[];
  primaryImage?: string;
  experienceReservationType?: ExperienceReservationType;
  experienceDatesType?: ExperienceDatesType;
  attendanceType?: AttendanceType;
  receptionTimeType?: ReceptionTimeType;
  experienceTypeId: number;
  pricePerPerson: number;
}

export interface ExperienceScheduleDatesDto {
  scheduleDateId: number;
  date?: string;
  scheduleTimeSlots: ExperienceTimeSlotDto[];
}

export interface ExperienceStep1 {
  id?: number;
  currencyId?: number;
  name: string;
  experienceTypeId: number;
}

export interface ExperienceStep2 {
  id: number;
  lng: number;
  lat: number;
  districtId?: number;
  cityId: number;
}

export interface ExperienceStep3 {
  id: number;
  description: string;
  languageType: LanguageType;
  attendanceType: AttendanceType;
  meanIds: number[];
}

export interface ExperienceStep4 {
  id: number;
  images: ImagesRequestDto[];
}

export interface ExperienceStep5 {
  id: number;
  experienceReservationWay: ExperienceReservationWay;
  experienceDatesType: ExperienceDatesType;
  receptionTimeType?: ReceptionTimeType;
  experienceTimeSlots: ExperienceTimeSlotDto[];
  experienceScheduleDates: ExperienceScheduleDatesDto[];
}

export interface ExperienceStep6 {
  id: number;
  pricePerPerson: number;
}

export interface ExperienceTimeSlotDto {
  timeSlotId: number;
  checkInTime?: string;
  checkOutTime?: string;
  availableSeats: number;
}

export interface ExperienceTypeCount {
  id?: number;
  name?: string;
  experiencesCount: number;
}

export interface ExperienceWithNavigationPropertiesDto extends ExperienceWithNavigationPropertiesDtoBase {
}

export interface ExperienceWithNavigationPropertiesDtoBase {
  experience: ExperienceDto;
  experienceType: ExperienceTypeDto;
  city: CityDto;
  numberOfConfirmedReservations?: number;
  district: DistrictDto;
  means: MeanDto[];
  hasSubmittedIdentityDocuments: boolean;
  ratingsCount: number;
  ratingsAverage: number;
}

export interface GeDetailsReservationPricingForGuestDto {
  numberOfPerson: number;
  pricePerPerson: number;
  netPrice: number;
  serviceFeesIncludesTax: number;
  totalPrice: number;
  serviceFees: number;
  tax: number;
  valueAddedTax: number;
}

export interface GetExperienceAvailabilityTimeSlotDto {
  date?: string;
  specificTimeSlots: SpecificTimeSlotDto[];
  detailsReservation: GeDetailsReservationPricingForGuestDto;
}

export interface GetExperienceDetailsForGuestResponseDto {
  experience: ExpeirenceForGuestDto;
  means: MeanDto[];
  city: CityDto;
  district: DistrictDto;
  ratingsCount: number;
  ratingsAverage: number;
}

export interface GetExperienceListItemForGuestDto {
  experience: ExperienceForGuestListItemDto;
  city: CityDto;
  district: DistrictDto;
  pricePerPerson?: number;
  ratingsCount: number;
  ratingsAverage: number;
}

export interface GetExperiencesInput extends GetExperiencesInputBase {
  cityIds: number[];
  experienceTypeIds: number[];
  dateFrom?: string;
  dateTo?: string;
  showOnHome?: boolean;
}

export interface GetExperiencesInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  name?: string;
  experienceStatus?: ExperienceStatus;
  district?: string;
  postalCode?: string;
  lngMin?: number;
  lngMax?: number;
  latMin?: number;
  latMax?: number;
  description?: string;
  moreDetails?: string;
  experienceReservationType?: ExperienceReservationType;
  experienceReservationWay?: ExperienceReservationWay;
  experienceTypeId?: number;
  cityId?: number;
  meanId?: number;
}

export interface GetRelatedExperiencesInputForGuest extends PagedAndSortedResultRequestDto {
  experienceId: number;
  cityId: number;
  experienceTypeId: number;
}

export interface ImagesRequestDto {
  imagePath?: string;
  isMain: boolean;
}
