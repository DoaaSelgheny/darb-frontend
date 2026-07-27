import type { UserSummaryDto } from '../../users/models';
import type { ReservationStatus } from '../../reservation-users/reservation-status.enum';
import type { ReservationType } from '../../reservation-users/reservation-type.enum';
import type { AmountPay } from '../../reservation-users/amount-pay.enum';
import type { PaymentType } from '../../reservation-users/payment-type.enum';
import type { LocationDto } from '../../districts/models';
import type { VacationHomePublishStatus } from '../../vacation-homes/vacation-home-publish-status.enum';

export interface GuestVacationHomeReservationDetailsDto {
  id: number;
  vacationHomeSummary: GuestVacationHomeSummaryDto;
  summary: GuestVacationHomeReservationSummaryDto;
  host: UserSummaryDto;
  canRating: boolean;
  ratedBefore: boolean;
}

export interface GuestVacationHomeReservationSummaryDto {
  number: number;
  status: ReservationStatus;
  startDate?: string;
  endDate?: string;
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
  rejectionReason?: string;
  ratingsCount: number;
  ratingsAverage: number;
  valueAddedTax: number;
  paymentUrl?: string;
  qrCodeImageUrl?: string;
  paymentReceiptFileName?: string;
  canUploadPaymentReceipt: boolean;
  paymentDeadline?: string;
  canRetryPayment: boolean;
}

export interface GuestVacationHomeSummaryDto {
  id: number;
  name?: string;
  typeId?: number;
  typeName?: string;
  primaryImage?: string;
  images: string[];
  location: LocationDto;
  conditionsReservation?: string;
  publishStatus: VacationHomePublishStatus;
}
