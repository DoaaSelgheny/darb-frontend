import type { MeanDto } from '../means/models';

export interface VacationHomeMeanDto {
  vacationHomeId: number;
  meanId: number;
  mean: MeanDto;
}
