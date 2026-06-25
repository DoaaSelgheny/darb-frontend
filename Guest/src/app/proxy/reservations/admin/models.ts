import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { ReservationStatus } from '../../reservation-users/reservation-status.enum';
import type { TransferStatus } from '../../reservation-users/transfer-status.enum';

export interface FinancialTransactionRequestDto extends PagedAndSortedResultRequestDto {
  reservationStatus?: ReservationStatus;
  transferStatus?: TransferStatus;
  filterText?: string;
}
