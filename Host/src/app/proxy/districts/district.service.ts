import type { DistrictDto, GetDistrictsInput } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DistrictService {
  apiName = 'Default';
  

  getList = (input: GetDistrictsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<DistrictDto>>({
      method: 'GET',
      url: '/api/app/district',
      params: { filterText: input.filterText, name: input.name, cityId: input.cityId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
