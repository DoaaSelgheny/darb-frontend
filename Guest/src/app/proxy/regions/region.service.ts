import type { RegionLookupDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  apiName = 'Default';
  

  getRegions = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, RegionLookupDto[]>({
      method: 'GET',
      url: '/api/app/region/regions',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
