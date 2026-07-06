import type { PaymentMethods } from './payment-methods.enum';

export interface CreateExperiencePaymentDto {
  returnUrl?: string;
  experienceId: number;
  checkInTime?: string;
  checkOutTime?: string;
  date?: string;
  numberOfPeople: number;
  paymentMethod: string;
  method: PaymentMethod;
  applyPayToken: object;
}

export interface CreatePaymentDto {
  returnUrl?: string;
  vacationHomeId: number;
  dateFrom?: string;
  dateTo?: string;
  paymentMethod: string;
  method: PaymentMethod;
  applyPayToken: object;
}

export interface CreatePaymentResultDto {
  paymentUrl?: string;
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

export interface PaymentMethod {
  method: PaymentMethods;
}

export interface PrimaryPaymentDto {
  basicPrice: number;
  numberOfDays: number;
  amount: number;
  tax: number;
  totalAmount: number;
}
