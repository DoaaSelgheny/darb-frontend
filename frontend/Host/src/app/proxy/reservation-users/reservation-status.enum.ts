import { mapEnumToOptions } from '@abp/ng.core';

export enum ReservationStatus {
  Pending = 0,
  Approved = 1,
  Complete = 2,
  CanceledAndRefunded = 3,
  Occupied = 4,
  ThirdParty = 5,
  PendingApproval = 6,
  Rejected = 7,
  AwaitingPayment = 8,
  PaymentFailed = 9,
  CancelledPaymentTimeout = 10,
}

export const reservationStatusOptions = mapEnumToOptions(ReservationStatus);
