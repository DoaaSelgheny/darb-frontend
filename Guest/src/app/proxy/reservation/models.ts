import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { ReservationTimeFrame } from '../shared/enums/reservation-time-frame.enum';
import type { ReservationStatus } from '../reservation-users/reservation-status.enum';

export interface ReservationsGuestFilter extends PagedAndSortedResultRequestDto {
  reservationTimeFrame: ReservationTimeFrame;
}

export interface ReservationsHostFilter extends PagedAndSortedResultRequestDto {
  reservationStatus?: ReservationStatus;
  filterText?: string;
}
