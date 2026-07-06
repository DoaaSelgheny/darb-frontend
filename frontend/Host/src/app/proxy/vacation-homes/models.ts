import type { VacationHomePublishStatus } from './vacation-home-publish-status.enum';
import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { CityDto } from '../cities/models';
import type { DistrictDto } from '../districts/models';
import type { VacationHomeStatus } from './vacation-home-status.enum';
import type { VacationHomeAmenitiesType } from './vacation-home-amenities-type.enum';
import type { AmenitiesType } from '../amenitiess/amenities-type.enum';
import type { LightAmenitiesDto, LightSubAmenitiesDto } from '../amenitiess/models';
import type { VacationHomeReservationWay } from './vacation-home-reservation-way.enum';
import type { VacationHomeCategoryType } from './vacation-home-category-type.enum';
import type { VacationHomeMeanDto } from '../vacation-home-means/models';
import type { VacationHomeTypeDto } from '../vacation-home-types/models';
import type { VacationHomeImageDto } from '../vacation-home-images/models';
import type { CurrencyDto } from '../currencies/models';
import type { RegionLookupDto } from '../regions/models';

export interface AmintiesVacationHome {
  amintieId?: string;
  count: number;
  bedNo: number;
  subAmintiesVacationHomeDto: SubAmintiesVacationHome[];
}

export interface ChangeVacationHomeStatusDto {
  id: number;
  vacationHomePublishStatus: VacationHomePublishStatus;
}

export interface GetRelatedVacationHomesInputForGuest extends PagedAndSortedResultRequestDto {
  vacationHomeId: number;
  cityId: number;
  vacationHomeTypeId: number;
}

export interface GetVacationHomeAvailability {
  vacationHomeId: number;
  dateFrom?: string;
  dateTo?: string;
}

export interface GetVacationHomeCheckOutResponseDto {
  pricePerNight: number;
  checkInDate?: string;
  checkOutDate?: string;
  accessTime?: string;
  leaveTime?: string;
  numberOfNights: number;
  serviceFeePercentage: number;
  serviceFee: number;
  subTotalPrice: number;
  taxForGuest: number;
  serviceFeeIncludeTax: number;
  totalPrice: number;
  payNow: number;
  isAvailable: boolean;
  valueAddedTax: number;
}

export interface GetVacationHomeDetailsForGuestRequestDto {
  dateFrom: string;
  dateTo: string;
}

export interface GetVacationHomeDetailsForGuestResponseDto {
  vacationHome: VacationHomeForGuestDto;
  city: CityDto;
  district: DistrictDto;
  licenseNumber?: string;
  permitNumber?: string;
  cancellationAndReturnPolicy?: string;
  ratingsCount: number;
  ratingsAverage: number;
}

export interface GetVacationHomeListItemForGuestDto {
  vacationHome: VacationHomeForGuestListItemDto;
  city: CityDto;
  district: DistrictDto;
  averagePrice?: number;
  ratingsCount: number;
  ratingsAverage: number;
}

export interface GetVacationHomesInputForGuest extends PagedAndSortedResultRequestDto {
  filterText?: string;
  priceFrom?: number;
  priceTo?: number;
  cityId?: number;
  vacationHomeTypeId?: number;
  cityIds: number[];
  vacationHomeTypeIds: number[];
  dateFrom?: string;
  dateTo?: string;
  showOnHome?: boolean;
}

export interface GetVacationHomesInputForHost extends PagedAndSortedResultRequestDto {
  filterText?: string;
  vacationHomeStatus?: VacationHomeStatus;
  cityId?: number;
  vacationHomeTypeId?: number;
  showOnHome?: boolean;
}

export interface HostVacationHomeNameDto {
  id: number;
  name?: string;
}

export interface SubAmintiesVacationHome {
  subAmintieId?: string;
}

export interface VacationHomeAmenitiesDto {
  id: number;
  count: number;
  guestCountPerAmenity: number;
  vacationHomeId: number;
  amenitiesId?: string;
  type: VacationHomeAmenitiesType;
  amenitiesType: AmenitiesType;
  symbol?: string;
  vacationHomeSubAmenities: VacationHomeSubAmenitiesDto[];
  amenities: LightAmenitiesDto;
  subAmenities: LightSubAmenitiesDto[];
}

export interface VacationHomeCountDto {
  total: number;
  accepted: number;
  rejected: number;
  unComplete: number;
  underReview: number;
  waitingModificationToCompleted: number;
}

export interface VacationHomeCountTypesDto {
  total: number;
  vacationHomeTypes: VacationHomeTypeCount[];
}

export interface VacationHomeDraftStep1 {
  id?: number;
  name?: string;
  vacationHomeTypeId?: number;
}

export interface VacationHomeDraftStep2 {
  id: number;
  lng?: number;
  lat?: number;
  cityId?: number;
  districtId?: number;
  isOwningMultipleUnits: boolean;
  unitNumber: number;
  unitFloor: number;
  street?: string;
}

export interface VacationHomeDraftStep3 {
  id: number;
  areaString?: string;
  area?: number;
  amenities: AmintiesVacationHome[];
}

export interface VacationHomeDraftStep8 {
  id: number;
  primaryImages: string[];
  mainImage?: string;
}

export interface VacationHomeDraftStep9 {
  id: number;
  accessTime?: string;
  leaveTime?: string;
  minimumHomeReservationAmount?: number;
  vacationHomeReservationWay: VacationHomeReservationWay;
}

export interface VacationHomeDto extends FullAuditedEntityDto<number> {
  name?: string;
  vacationHomeTypeId?: number;
  vacationHomeTypeName?: string;
  cityId?: number;
  districtId?: number;
  cancellationAndReturnPolicyId?: number;
  midweekPrice?: number;
  thursdayPrice?: number;
  fridayPrice?: number;
  saturdayPrice?: number;
  conditionsReservation?: string;
  isRefunded: boolean;
  isPublish?: boolean;
  lng: number;
  lat: number;
  mapLink?: string;
  district?: string;
  areaString?: string;
  area: number;
  numberOfRooms: number;
  numberOfReceptions: number;
  numberOfBathrooms: number;
  maxNumberOfGuests: number;
  depositPercentage?: number;
  advantages?: string;
  description?: string;
  otherDetails?: string;
  vacationCategoryId?: string;
  vacationHomeCategoryType?: VacationHomeCategoryType;
  currencyId: number;
  basicPrice: number;
  weekEndPrice: number;
  deposit?: number;
  vacationHomeStatus: VacationHomeStatus;
  vacationHomePublishStatus: VacationHomePublishStatus;
  vacationHomeReservationWay?: VacationHomeReservationWay;
  rate: number;
  rateCount: number;
  primaryImage?: string;
  primaryImages: string[];
  vacationHomeAmenities: VacationHomeAmenitiesDto[];
  vacationHomeMeans: VacationHomeMeanDto[];
  serialNumber?: string;
  vacationHomeType: VacationHomeTypeDto;
  bookingTypeId: number;
  accessTime?: string;
  leaveTime?: string;
  minimumHomeReservationAmount?: number;
  maximumHomeReservationAmount?: number;
  currentStep?: number;
  rejectionReason?: string;
  signingAgreement: boolean;
  isPublished: boolean;
  showOnHome: boolean;
  vacationHomeImages: VacationHomeImageDto[];
  primaryAmenities: string[];
  primaryAmenitiesObjects: VacationHomeAmenitiesDto[];
  selectedFacilities: string[];
  secondaryAmenities: string[];
  city: CityDto;
  checkInTime?: string;
  checkOutTime?: string;
  availableFrom?: string;
  availableTo?: string;
  isAvailableAllYear: boolean;
  averageDayPrice: number;
  isOwningMultipleUnits: boolean;
  unitNumber: number;
  unitFloor: number;
  street?: string;
}

export interface VacationHomeFilter {
  filterText?: string;
  vacationHomeStatus?: VacationHomeStatus;
  cityId?: number;
  vacationHomeTypeId?: number;
  showOnHome?: boolean;
}

export interface VacationHomeForGuestDto {
  id: number;
  name?: string;
  vacationHomeAmenities: VacationHomeAmenitiesDto[];
  areaString?: string;
  area?: number;
  serialNumber?: string;
  vacationHomeMeans: VacationHomeMeanDto[];
  description?: string;
  vacationHomeTypeId?: number;
  vacationHomeCategoryType?: VacationHomeCategoryType;
  cancellationAndReturnPolicyId?: number;
  conditionsReservation?: string;
  deposit?: number;
  isRefunded: boolean;
  depositPercentage?: number;
  vacationHomeImages: VacationHomeImageDto[];
  primaryImage?: string;
  accessTime?: string;
  leaveTime?: string;
  bookingTypeId: number;
  minimumHomeReservationAmount?: number;
  vacationHomeReservationWay?: VacationHomeReservationWay;
}

export interface VacationHomeForGuestListItemDto {
  id: number;
  name?: string;
  vacationHomeAmenities: VacationHomeAmenitiesDto[];
  vacationHomeImages: VacationHomeImageDto[];
  vacationHomeType: VacationHomeTypeDto;
  primaryImage?: string;
  areaString?: string;
  area?: number;
  midweekPrice?: number;
  thursdayPrice?: number;
  fridayPrice?: number;
  saturdayPrice?: number;
}

export interface VacationHomeHostCalendarDto {
  id: number;
  name?: string;
  publishStatus: VacationHomePublishStatus;
  reservationsNumber: number;
  typeName?: string;
}

export interface VacationHomeHostCalendarFilterDto extends PagedAndSortedResultRequestDto {
  filterText?: string;
  publishStatus?: VacationHomePublishStatus;
  typeId?: number;
}

export interface VacationHomeStep1 {
  id?: number;
  name: string;
  vacationHomeTypeId: number;
}

export interface VacationHomeStep2 {
  id: number;
  lng?: number;
  lat?: number;
  mapLink?: string;
  cityId?: number;
  districtId?: number;
  isOwningMultipleUnits: boolean;
  unitNumber: number;
  unitFloor: number;
  street?: string;
}

export interface VacationHomeStep3 {
  id: number;
  area?: number;
  areaString?: string;
  amenities: AmintiesVacationHome[];
}

export interface VacationHomeStep4 {
  id: number;
  meansLookup: number[];
}

export interface VacationHomeStep5 {
  id: number;
  description?: string;
  vacationHomeCategoryType?: VacationHomeCategoryType;
}

export interface VacationHomeStep6 {
  id: number;
  deposit?: number;
  conditionsReservation?: string;
  cancellationAndReturnPolicyId: number;
  isRefunded: boolean;
}

export interface VacationHomeStep7 {
  id: number;
  midweekPrice?: number;
  thursdayPrice?: number;
  fridayPrice?: number;
  saturdayPrice?: number;
  depositPercentage?: number;
}

export interface VacationHomeStep8 {
  id: number;
  primaryImages: string[];
  mainImage?: string;
}

export interface VacationHomeStep9 {
  id: number;
  accessTime?: string;
  leaveTime?: string;
  minimumHomeReservationAmount?: number;
  vacationHomeReservationWay: VacationHomeReservationWay;
}

export interface VacationHomeSubAmenitiesDto {
  count: number;
  guestCountPerAmenity: number;
  vacationHomeId: number;
  vacationHomeAmenitiesId: number;
  subAmenitiesId?: string;
  subAmenities: LightSubAmenitiesDto;
}

export interface VacationHomeTypeCount {
  vacationHomeType?: number;
  vacationHomeTypeAr?: string;
  vacationHomeTypeEn?: string;
  numberOfVacationHomeTypes: number;
}

export interface VacationHomeWithNavigationPropertiesDto {
  vacationHome: VacationHomeDto;
  vacationHomeType: VacationHomeTypeDto;
  currency: CurrencyDto;
  city: CityDto;
  numberOfConfirmedReservations?: number;
  district: DistrictDto;
  region: RegionLookupDto;
  isYakeenVerified: boolean;
  isVerifiedMinistryTourism: boolean;
  ratingsCount: number;
  ratingsAverage: number;
}
