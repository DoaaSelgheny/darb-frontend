import { mapEnumToOptions } from '@abp/ng.core';

export enum NotificationType {
  SendLoginTokenBySMS = 0,
  SendLoginTokenByEmail = 1,
  SendApprovedAccountVerification = 2,
  SendRejectionAccountVerification = 3,
  SendApprovedVacationHomeVerification = 4,
  SendRejectionVacationHomeVerification = 5,
  SendApprovedExperienceVerification = 6,
  SendRejectionExperienceVerification = 7,
  SendCommissionPercentageChanged = 8,
  SendApprovedVacationHomeGuestReservation = 9,
  SendApprovedExperienceGuestReservation = 10,
  SendCancelVacationHomeGuestReservation = 11,
  SendApprovedVacationHomeGuestReservationWhatsApp = 12,
  SendApprovedExperienceGuestReservationWhatsApp = 13,
  SendHostWalletTransferAwaitingConfirmation = 14,
  SendHostWalletTransferAwaitingConfirmationWhatsApp = 15,
}

export const notificationTypeOptions = mapEnumToOptions(NotificationType);
