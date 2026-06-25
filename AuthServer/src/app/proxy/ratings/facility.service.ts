import type { GetFacilityDto } from './models';
import type { ServiceType } from './service-type.enum';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FacilityService {
  apiName = 'Default';
  

  getFacilityListByServiceType = (serviceType: ServiceType, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetFacilityDto[]>({
      method: 'GET',
      url: '/api/app/facility/facility-list',
      params: { serviceType },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
