import type { CombinedServicesFilter, GetCombinedServicesReponseDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CombinedServicesService {
  apiName = 'Default';
  

  getByFilter = (filter: CombinedServicesFilter, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetCombinedServicesReponseDto>({
      method: 'GET',
      url: '/api/app/combined-services',
      params: { type: filter.type, typeId: filter.typeId, cityId: filter.cityId, districtId: filter.districtId, dateFrom: filter.dateFrom, dateTo: filter.dateTo, sorting: filter.sorting, skipCount: filter.skipCount, maxResultCount: filter.maxResultCount },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
