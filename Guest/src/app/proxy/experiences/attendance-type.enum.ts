import { mapEnumToOptions } from '@abp/ng.core';

export enum AttendanceType {
  Men = 1,
  Women = 2,
  Children = 3,
  Adults = 4,
  All = 5,
}

export const attendanceTypeOptions = mapEnumToOptions(AttendanceType);
