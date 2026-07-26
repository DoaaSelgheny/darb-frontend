import type { PaymentType } from '../reservation-users/payment-type.enum';
import type { ReservationStatus } from '../reservation-users/reservation-status.enum';

export interface CreateExperiencePaymentDto {
  experienceId: number;
  checkInTime?: string;
  checkOutTime?: string;
  date?: string;
  numberOfPeople: number;
}

export interface CreatePaymentDto {
  vacationHomeId: number;
  dateFrom?: string;
  dateTo?: string;
}

export interface CreatePaymentResultDto {
  reservationId: number;
}

export interface FollowUpTransactionDto {
  cartId?: string;
  cartAmount: number;
  cartDescription?: string;
  tranRef?: string;
}

export interface GetReservationStatus {
  acquirerMessage?: string;
  acquirerRRN?: string;
  cartId?: string;
  customerEmail?: string;
  respCode: number;
  respStatus?: string;
  respMessage?: string;
  signature?: string;
  token?: string;
  tranRef?: string;
}

export interface PrimaryPaymentDto {
  basicPrice: number;
  numberOfDays: number;
  amount: number;
  tax: number;
  totalAmount: number;
}

export interface StartPaymentInput {
  reservationId: number;
  paymentType: PaymentType;
}

export interface StartPaymentResultDto {
  reservationId: number;
  paymentType: PaymentType;
  status: ReservationStatus;
  paymentUrl?: string;
  qrCodeImageUrl?: string;
  paymentDeadline?: string;
  requiresQr: boolean;
}
