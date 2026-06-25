import type { ServiceAverageRatingsListDto } from '../models';

export interface ServiceAverageRatingsResponseDto {
  ratingsCount: number;
  ratingsAverage: number;
  averageRatingsList: ServiceAverageRatingsListDto[];
}
