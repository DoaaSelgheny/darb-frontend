import type { GetSyncCalendarResponseDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupDto } from '../shared/models';
import type { SyncCalendarType } from '../vacation-homes/sync-calendar-type.enum';

@Injectable({
  providedIn: 'root',
})
export class SyncCalendarService {
  apiName = 'Default';
  

  getSyncCalendarsListByVacationHomeIdAndSyncCalendarType = (vacationHomeId: number, syncCalendarType: SyncCalendarType, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetSyncCalendarResponseDto[]>({
      method: 'GET',
      url: `/api/app/sync-calendar/sync-calendars-list/${vacationHomeId}`,
      params: { syncCalendarType },
    },
    { apiName: this.apiName,...config });
  

  getThirdPartyNamesByVacationHomeIdByVacationHomeId = (vacationHomeId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto<number>>({
      method: 'GET',
      url: `/api/app/sync-calendar/third-party-names-by-vacation-home-id/${vacationHomeId}`,
    },
    { apiName: this.apiName,...config });
  

  importICalendar = (icalUrl: string, vacationHomeId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/sync-calendar/import-iCalendar/${vacationHomeId}`,
      params: { icalUrl },
    },
    { apiName: this.apiName,...config });
  

  syncThirdPartyCalendarById = (Id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/sync-calendar/sync-third-party-calendar/${Id}`,
    },
    { apiName: this.apiName,...config });
  

  toggleSyncCalendarById = (Id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/sync-calendar/toggle-sync-calendar/${Id}`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
