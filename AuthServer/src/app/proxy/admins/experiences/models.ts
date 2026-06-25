import type { UserSummaryDto } from '../../users/models';
import type { HostExperienceSummaryDto } from '../../hosts/experience/models';
import type { ReservationStatus } from '../../reservation-users/reservation-status.enum';
import type { AmountPay, ReservationStatus, ReservationType } from '../../reservation-users/models';
import type { ReservationType } from '../../reservation-users/reservation-type.enum';
import type { AmountPay } from '../../reservation-users/amount-pay.enum';

export interface AdminExperienceReservationDetailsDto {
  id: number;
  summary: AdminExperienceReservationSummaryDto;
  guest: UserSummaryDto;
  host: UserSummaryDto;
  experienceSummary: HostExperienceSummaryDto;
}

export interface AdminExperienceReservationSummaryDto {
  number: number;
  status: ReservationStatus;
  date?: string;
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

export interface HostExperienceReservationDetailsDto {
  id: number;
  summary: HostExperienceReservationSummaryDto;
  guest: UserSummaryDto;
  experienceSummary: HostExperienceSummaryDto;
}

export interface HostExperienceReservationSummaryDto {
  number: number;
  status: ReservationStatus;
  date?: string;
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
