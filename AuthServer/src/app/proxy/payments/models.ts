import type { PaymentMethods } from './payment-methods.enum';

export interface ApplyPayToken {
  isSuccess: object;
  isPending: object;
  billingDetails: Billingdetails;
  cartAmount: object;
  paymentinfo: Paymentinfo;
  transactionReference?: string;
  transactionType: object;
  paymentResult: Paymentresult;
  cartID: object;
  trace: object;
  isAuthorized: object;
  profileld: object;
  isProcessed: object;
  merchantld: object;
  tranCurrency: object;
  cartCurrency: object;
  cartDescription: object;
  serviceld: object;
  isOnHold: object;
  tranTotal: object;
}

export interface Billingdetails {
  name: object;
  city: object;
  phone: object;
  zip: object;
  email: object;
  countryCode: object;
  addressLine: object;
  state: object;
}

export interface CreateExperiencePaymentDto {
  returnUrl?: string;
  experienceId: number;
  checkInTime?: string;
  checkOutTime?: string;
  date?: string;
  numberOfPeople: number;
  paymentMethod: string;
  method: PaymentMethod;
  applyPayToken: ApplyPayToken;
  isHandledByFront: boolean;
}

export interface CreatePaymentDto {
  returnUrl?: string;
  vacationHomeId: number;
  dateFrom?: string;
  dateTo?: string;
  paymentMethod: string;
  method: PaymentMethod;
  applyPayToken: ApplyPayToken;
  isHandledByFront: boolean;
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

export interface Paymentinfo {
  payment_method: object;
  cardType: object;
  paymentDescription: object;
  expiryMonth: object;
  cardScheme: object;
  expiryYear: object;
}

export interface Paymentresult {
  responseCode: object;
  transactionTime: object;
  acquirerMessage: object;
  acquirerRRN: object;
  responseMessage: object;
  responseStatus: object;
}

export interface PrimaryPaymentDto {
  basicPrice: number;
  numberOfDays: number;
  amount: number;
  tax: number;
  totalAmount: number;
}
