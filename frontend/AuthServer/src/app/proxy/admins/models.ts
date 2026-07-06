import type { AdminVacationHomeReservationSummaryDto, HostVacationHomeSummaryDto } from '../hosts/models';
import type { UserSummaryDto } from '../users/models';

export interface AdminVacationHomeReservationDetailsDto {
  id: number;
  summary: AdminVacationHomeReservationSummaryDto;
  guest: UserSummaryDto;
  host: UserSummaryDto;
  vacationHomeSummary: HostVacationHomeSummaryDto;
}
