import type { ReservationStatus } from '../reservation-users/reservation-status.enum';
import type { AmountPay, ReservationStatus, ReservationType } from '../reservation-users/models';
import type { ReservationType } from '../reservation-users/reservation-type.enum';
import type { AmountPay } from '../reservation-users/amount-pay.enum';
import type { UserSummaryDto } from '../users/models';

export interface AdminVacationHomeReservationSummaryDto {
  number: number;
  status: ReservationStatus;
  startDate?: string;
  endDate?: string;
  checkIn?: string;
  checkOut?: string;
  unitPrice: number;
  numberOfDaysOrPeople: number;
  totalRevenueForHost: number;
  commissionIncludesTax: number;
  serviceFeesIncludesTax: number;
  netPrice: number;
  reservationType: ReservationType;
  amountPay: AmountPay;
  rejectionReason?: string;
  invoiceId?: number;
  cancellationAndReturnPolicyId?: number;
  cancellationAndReturnPolicyName?: string;
  cancellationAndReturnPolicyDescription?: string;
  valueAddedTax: number;
}

export interface HostVacationHomeSummaryDto {
  id: number;
  name?: string;
  typeId?: number;
  typeName?: string;
  primaryImage?: string;
  ratingsCount: number;
  ratingsAverage: number;
}

export interface HostVacationHomeReservationDetailsDto {
  id: number;
  vacationHomeSummary: HostVacationHomeSummaryDto;
  summary: HostVacationHomeReservationSummaryDto;
  guest: UserSummaryDto;
}

export interface HostVacationHomeReservationSummaryDto {
  number: number;
  status: ReservationStatus;
  startDate?: string;
  endDate?: string;
  checkIn?: string;
  checkOut?: string;
  unitPrice: number;
  numberOfDaysOrPeople: number;
  totalRevenueForHost: number;
  commissionIncludesTax: number;
  netPrice: number;
  reservationType: ReservationType;
  amountPay: AmountPay;
  rejectionReason?: string;
  invoiceId?: number;
  cancellationAndReturnPolicyId?: number;
  cancellationAndReturnPolicyName?: string;
  cancellationAndReturnPolicyDescription?: string;
  valueAddedTax: number;
}
