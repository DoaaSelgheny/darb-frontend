import { mapEnumToOptions } from '@abp/ng.core';

export enum VacationHomeReservationWay {
  Instant = 0,
}

export const vacationHomeReservationWayOptions = mapEnumToOptions(VacationHomeReservationWay);
