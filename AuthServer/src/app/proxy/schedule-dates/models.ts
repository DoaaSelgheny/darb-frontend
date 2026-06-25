import type { EntityDto } from '@abp/ng.core';

export interface ScheduleDateDto extends EntityDto<number> {
  experienceId: number;
  date?: string;
  scheduleTimeSlots: ScheduleTimeSlotDto[];
}

export interface ScheduleTimeSlotDto {
  checkInTime?: string;
  checkOutTime?: string;
  availableSeats: number;
}
