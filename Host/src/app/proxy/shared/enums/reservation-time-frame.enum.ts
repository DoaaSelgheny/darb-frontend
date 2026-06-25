import { mapEnumToOptions } from '@abp/ng.core';

export enum ReservationTimeFrame {
  Past = 0,
  Upcoming = 1,
}

export const reservationTimeFrameOptions = mapEnumToOptions(ReservationTimeFrame);
