import type { EntityDto } from '@abp/ng.core';

export interface SpecificTimeSlotDto extends EntityDto<number> {
  checkInTime?: string;
  checkOutTime?: string;
  availableSeats: number;
  totalSeats: number;
}
