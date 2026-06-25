import type { ReservationType } from '../reservation-users/reservation-type.enum';
import type { AmountPay, DayAvailabilityStatus, ReservationStatus, ReservationType, TransferStatus } from '../reservation-users/models';
import type { ReservationStatus } from '../reservation-users/reservation-status.enum';
import type { TransferStatus } from '../reservation-users/transfer-status.enum';
import type { AmountPay } from '../reservation-users/amount-pay.enum';
import type { CityDto } from '../cities/models';
import type { DistrictDto } from '../districts/models';
import type { DayAvailabilityStatus } from '../reservation-users/day-availability-status.enum';

export interface ReservationAdminDto {
  id: number;
  experienceId?: number;
  experienceName?: string;
  vacationHomeId?: number;
  vacationHomeName?: string;
  hostName?: string;
  reservationNumber: number;
  reservationType: ReservationType;
  netPrice: number;
  actionDate?: string;
  reservationStatus: ReservationStatus;
  guestName?: string;
  guestMobilNumber?: string;
  hostMobileNumber?: string;
  guestServiceFees: number;
  hostCommision: number;
  ratingsCount: number;
  ratingsAverage: number;
  valueAddedTax: number;
}

export interface ReservationAdminTransactionDto {
  id: number;
  experienceId?: number;
  experienceName?: string;
  vacationHomeId?: number;
  vacationHomeName?: string;
  hostName?: string;
  reservationNumber: number;
  netPrice: number;
  actionDate?: string;
  transferExecutionDate?: string;
  transferStatus: TransferStatus;
  transferFailureReason?: string;
  reservationType: ReservationType;
  reservationStatus: ReservationStatus;
  accountNo?: string;
  ammountToTransfer: number;
  bankAccount?: string;
  hostEmail?: string;
  iban?: string;
  phoneNumber?: string;
  reservationDate?: string;
  invoiceNumber?: string;
  valueAddedTax: number;
  clickPayStaus?: string;
  clickPayMessage?: string;
}

export interface ReservationGuestDto {
  id: number;
  experienceId?: number;
  experienceName?: string;
  vacationHomeId?: number;
  vacationHomeName?: string;
  image?: string;
  startDate?: string;
  endDate?: string;
  checkIn?: string;
  checkOut?: string;
  reservationStatus: ReservationStatus;
  totalPrice: number;
  reservationType: ReservationType;
  amountPay: AmountPay;
  canRebooking: boolean;
  canRating: boolean;
  ratingsCount: number;
  ratingsAverage: number;
  city: CityDto;
  district: DistrictDto;
  valueAddedTax: number;
}

export interface ReservationHostDto {
  id: number;
  guestName?: string;
  experienceId?: number;
  experienceName?: string;
  vacationHomeId?: number;
  vacationHomeName?: string;
  reservationNumber: number;
  reservationType: ReservationType;
  actionDate?: string;
  reservationStatus: ReservationStatus;
  revenueForHost: number;
  ratingsCount: number;
  rating: number;
  valueAddedTax: number;
}

export interface ReservationHostExcelDownloadDto {
  downloadToken?: string;
  reservationStatus?: ReservationStatus;
  filterText?: string;
}

export interface ReservationHostTransactionDto {
  id: number;
  experienceId?: number;
  experienceName?: string;
  vacationHomeId?: number;
  vacationHomeName?: string;
  reservationNumber: number;
  revenue?: number;
  actionDate?: string;
  transferExecutionDate?: string;
  transferStatus: TransferStatus;
  transferFailureReason?: string;
  reservationType: ReservationType;
  valueAddedTax: number;
  clickPayStaus?: string;
  clickPayMessage?: string;
}

export interface ReservationTransactionStatisticDto {
  totalTransfers: number;
  upcomingTransfers: number;
  executedTransfers: number;
}

export interface ToggleDayAvailabilityDto {
  vacationHomeId: number;
  availabilityStatus: DayAvailabilityStatus;
  occupiedDates: string[];
  freeReservationIds: number[];
}

export interface VacationHomeCalendarDto {
  id: number;
  name?: string;
  vacationHomeCalendarItems: VacationHomeCalendarItemDto[];
}

export interface VacationHomeCalendarFilterDto {
  vacationHomeId: number;
  syncCalendarId?: number;
}

export interface VacationHomeCalendarItemDto {
  id: number;
  from?: string;
  to?: string;
  reservationStatus: ReservationStatus;
  thirdPartyName?: string;
}
