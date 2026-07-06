import { mapEnumToOptions } from '@abp/ng.core';

export enum ExperienceReservationWay {
  Instant = 0,
  ReservationRequiresApproval = 1,
}

export const experienceReservationWayOptions = mapEnumToOptions(ExperienceReservationWay);
