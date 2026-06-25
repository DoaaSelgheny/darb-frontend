import { mapEnumToOptions } from '@abp/ng.core';

export enum AmenitiesType {
  BathRoom = 0,
  Kitchen = 1,
  BedRoom = 2,
  SwimmingPool = 3,
  LivingRoom = 4,
}

export const amenitiesTypeOptions = mapEnumToOptions(AmenitiesType);
