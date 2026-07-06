import type { ChangeVacationHomeStatusDto, GetVacationHomesInputForHost, HostVacationHomeNameDto, VacationHomeCountDto, VacationHomeCountTypesDto, VacationHomeDraftStep1, VacationHomeDraftStep2, VacationHomeDraftStep3, VacationHomeDraftStep8, VacationHomeDraftStep9, VacationHomeDto, VacationHomeHostCalendarDto, VacationHomeHostCalendarFilterDto, VacationHomeStep1, VacationHomeStep2, VacationHomeStep3, VacationHomeStep4, VacationHomeStep5, VacationHomeStep6, VacationHomeStep7, VacationHomeStep8, VacationHomeStep9, VacationHomeWithNavigationPropertiesDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { AmenitiesDto } from '../amenitiess/models';
import type { CityDto } from '../cities/models';
import type { BlobDto } from '../files/models';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';
import type { AgreementInformationDto, LookupDto, LookupRequestDto } from '../shared/models';
import type { VacationHomeTypeDto } from '../vacation-home-types/models';

@Injectable({
  providedIn: 'root',
})
export class VacationHomeHostService {
  apiName = 'Default';


  agreeById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/vacation-home-hosts/agree/${id}`,
    },
    { apiName: this.apiName,...config });


  agreementInformationById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AgreementInformationDto>({
      method: 'GET',
      url: `/api/app/vacation-home-hosts/agreement-information/${id}`,
    },
    { apiName: this.apiName,...config });


  changeVacationHomePublishStatusByInput = (input: ChangeVacationHomeStatusDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeDto>({
      method: 'PUT',
      url: '/api/app/vacation-home-hosts/ChangeVacationHomePublishStatus',
      body: input,
    },
    { apiName: this.apiName,...config });


  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/vacation-home-hosts',
      params: { id },
    },
    { apiName: this.apiName,...config });


  deleteImagesByInput = (input: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/vacation-home-hosts/DeleteImages',
      params: { input },
    },
    { apiName: this.apiName,...config });


  download = (fileName: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/api/app/vacation-home-hosts/download/${fileName}`,
    },
    { apiName: this.apiName,...config });


  downloadByCalendarName = (calendarName: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: '/api/app/vacation-home-hosts/download-calendar',
      params: { calendarName },
    },
    { apiName: this.apiName,...config });


  draftStep1ByInput = (input: VacationHomeDraftStep1, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeDto>({
      method: 'PUT',
      url: '/api/app/vacation-home-hosts/Draft/1',
      body: input,
    },
    { apiName: this.apiName,...config });


  draftStep2ByInput = (input: VacationHomeDraftStep2, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeDto>({
      method: 'PUT',
      url: '/api/app/vacation-home-hosts/Draft/2',
      body: input,
    },
    { apiName: this.apiName,...config });


  draftStep3ByInput = (input: VacationHomeDraftStep3, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeDto>({
      method: 'PUT',
      url: '/api/app/vacation-home-hosts/Draft/3',
      body: input,
    },
    { apiName: this.apiName,...config });


  draftStep8ByInput = (input: VacationHomeDraftStep8, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeDto>({
      method: 'PUT',
      url: '/api/app/vacation-home-hosts/Draft/8',
      body: input,
    },
    { apiName: this.apiName,...config });


  draftStep9ByInput = (input: VacationHomeDraftStep9, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeDto>({
      method: 'PUT',
      url: '/api/app/vacation-home-hosts/Draft/9',
      body: input,
    },
    { apiName: this.apiName,...config });


  getAmmenetiesByInput = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AmenitiesDto[]>({
      method: 'GET',
      url: '/api/app/vacation-home-hosts/ammeneties-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });


  getCalendarListByFilter = (filter: VacationHomeHostCalendarFilterDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<VacationHomeHostCalendarDto>>({
      method: 'GET',
      url: '/api/app/vacation-home-hosts/calendar-list',
      params: { filterText: filter.filterText, publishStatus: filter.publishStatus, typeId: filter.typeId, sorting: filter.sorting, skipCount: filter.skipCount, maxResultCount: filter.maxResultCount },
    },
    { apiName: this.apiName,...config });


  getCancellationAndReturnPolicyLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto<number>>({
      method: 'GET',
      url: '/api/app/vacation-home-hosts/cancellation-and-return-policy-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });


  getCityLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CityDto[]>({
      method: 'GET',
      url: '/api/app/vacation-home-hosts/city-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });


  getCount = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeCountDto>({
      method: 'GET',
      url: '/api/app/vacation-home-hosts/count',
    },
    { apiName: this.apiName,...config });


  getList = (input: GetVacationHomesInputForHost, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<VacationHomeWithNavigationPropertiesDto>>({
      method: 'GET',
      url: '/api/app/vacation-home-hosts',
      params: { filterText: input.filterText, vacationHomeStatus: input.vacationHomeStatus, cityId: input.cityId, vacationHomeTypeId: input.vacationHomeTypeId, showOnHome: input.showOnHome, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });


  getNames = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, HostVacationHomeNameDto[]>({
      method: 'GET',
      url: '/api/app/vacation-home-hosts/names',
    },
    { apiName: this.apiName,...config });


  getVacationHomeStatusLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto<number>>({
      method: 'GET',
      url: '/api/app/vacation-home-hosts/vacation-home-status-lookup',
    },
    { apiName: this.apiName,...config });


  getVacationHomeTypeLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto<number>>({
      method: 'GET',
      url: '/api/app/vacation-home-hosts/vacation-home-types-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });


  getVacationHomeTypes = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeTypeDto[]>({
      method: 'GET',
      url: '/api/app/vacation-home-hosts/vacation-home-types',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });


  getVactionHomeTypesCount = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeCountTypesDto>({
      method: 'GET',
      url: '/api/app/vacation-home-hosts/vacation-home-types-counts',
    },
    { apiName: this.apiName,...config });


  getWithNavigationProperties = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeWithNavigationPropertiesDto>({
      method: 'GET',
      url: `/api/app/vacation-home-hosts/${id}`,
    },
    { apiName: this.apiName,...config });


  publishVacationHomeById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeDto>({
      method: 'PUT',
      url: `/api/app/vacation-home-hosts/publish/${id}`,
    },
    { apiName: this.apiName,...config });


  saveStep1ByInput = (input: VacationHomeStep1, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeDto>({
      method: 'PUT',
      url: '/api/app/vacation-home-hosts/Save/1',
      body: input,
    },
    { apiName: this.apiName,...config });


  saveStep2ByInput = (input: VacationHomeStep2, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeDto>({
      method: 'PUT',
      url: '/api/app/vacation-home-hosts/Save/2',
      body: input,
    },
    { apiName: this.apiName,...config });


  saveStep3ByInput = (input: VacationHomeStep3, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeDto>({
      method: 'PUT',
      url: '/api/app/vacation-home-hosts/Save/3',
      body: input,
    },
    { apiName: this.apiName,...config });


  saveStep4ByInput = (input: VacationHomeStep4, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeDto>({
      method: 'PUT',
      url: '/api/app/vacation-home-hosts/Save/4',
      body: input,
    },
    { apiName: this.apiName,...config });


  saveStep5ByInput = (input: VacationHomeStep5, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeDto>({
      method: 'PUT',
      url: '/api/app/vacation-home-hosts/Save/5',
      body: input,
    },
    { apiName: this.apiName,...config });


  saveStep6ByInput = (input: VacationHomeStep6, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeDto>({
      method: 'PUT',
      url: '/api/app/vacation-home-hosts/Save/6',
      body: input,
    },
    { apiName: this.apiName,...config });


  saveStep7ByInput = (input: VacationHomeStep7, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeDto>({
      method: 'PUT',
      url: '/api/app/vacation-home-hosts/Save/7',
      body: input,
    },
    { apiName: this.apiName,...config });


  saveStep8ByInput = (input: VacationHomeStep8, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeDto>({
      method: 'PUT',
      url: '/api/app/vacation-home-hosts/Save/8',
      body: input,
    },
    { apiName: this.apiName,...config });


  saveStep9ByInput = (input: VacationHomeStep9, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VacationHomeDto>({
      method: 'PUT',
      url: '/api/app/vacation-home-hosts/Save/9',
      body: input,
    },
    { apiName: this.apiName,...config });


  upload = (file: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BlobDto>({
      method: 'POST',
      url: '/api/app/vacation-home-hosts/upload',
      body: file,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
