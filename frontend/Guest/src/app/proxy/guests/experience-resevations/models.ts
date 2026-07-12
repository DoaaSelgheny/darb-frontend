import type { UserSummaryDto } from '../../users/models';
import type { ReservationStatus } from '../../reservation-users/reservation-status.enum';
import type { ReservationType } from '../../reservation-users/reservation-type.enum';
import type { AmountPay } from '../../reservation-users/amount-pay.enum';
import type { PaymentType } from '../../reservation-users/payment-type.enum';
import type { LocationDto } from '../../districts/models';
import type { VisibleStatus } from '../../experiences/visible-status.enum';

export interface GuestExperienceReservationDetailsDto {
  id: number;
  experienceSummary: GuestExperienceSummaryDto;
  summary: GuestExperienceReservationSummaryDto;
  host: UserSummaryDto;
  canRating: boolean;
  ratedBefore: boolean;
}

export interface GuestExperienceReservationSummaryDto {
  number: number;
  status: ReservationStatus;
  date?: string;
  checkIn?: string;
  checkOut?: string;
  unitPrice: number;
  numberOfDaysOrPeople: number;
  serviceFeesIncludesTax: number;
  totalPriceForGuest: number;
  netPrice: number;
  reservationType: ReservationType;
  amountPay: AmountPay;
  insurance: number;
  deposit: number;
  paymentOnArrival: number;
  paymentType: PaymentType;
  cancellationAndReturnPolicyDescription?: string;
  canCancel: boolean;
  invoiceId?: number;
  ratingsCount: number;
  ratingsAverage: number;
  valueAddedTax: number;
  paymentUrl?: string;
  paymentDeadline?: string;
  canRetryPayment: boolean;
}

export interface GuestExperienceSummaryDto {
  id: number;
  name?: string;
  typeId?: number;
  typeName?: string;
  primaryImage?: string;
  images: string[];
  location: LocationDto;
  visibleStatus: VisibleStatus;
}
