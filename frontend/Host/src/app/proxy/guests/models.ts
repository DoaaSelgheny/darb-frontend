import type { AmenitiesType } from '../amenitiess/amenities-type.enum';
import type { ExperienceDatesType } from '../experiences/experience-dates-type.enum';
import type { ReceptionTimeType } from '../experiences/reception-time-type.enum';
import type { ExperienceReservationType } from '../experiences/experience-reservation-type.enum';
import type { AttendanceType } from '../experiences/attendance-type.enum';

export interface CombinedServiceVacationHomeAmentityDto {
  id?: string;
  name?: string;
  symbol?: string;
  count: number;
  type: AmenitiesType;
}

export interface GuestExperienceDto {
  id: number;
  name?: string;
  datesType?: ExperienceDatesType;
  receptionTimeType?: ReceptionTimeType;
  districtId?: number;
  districtName?: string;
  reservationType?: ExperienceReservationType;
  pricePerPerson?: number;
  typeId?: number;
  typeName?: string;
  cityId?: number;
  cityName?: string;
  attendanceType?: AttendanceType;
  primaryImage?: string;
  images: string[];
  serialNumber?: string;
  ratingsCount: number;
  ratingsAverage: number;
}

export interface GuestVacationHomeDto {
  id: number;
  name?: string;
  typeId?: number;
  typeName?: string;
  districtId?: number;
  districtName?: string;
  cityId?: number;
  cityName?: string;
  areaString?: string;
  area?: number;
  primaryImage?: string;
  serialNumber?: string;
  images: string[];
  totalPrice?: number;
  averagePrice?: number;
  amentites: CombinedServiceVacationHomeAmentityDto[];
  daysCount: number;
  ratingsAverage: number;
  ratingsCount: number;
}
