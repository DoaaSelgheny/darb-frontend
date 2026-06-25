import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { SubAmenitiesDto } from '../amenitiess/models';

@Injectable({
  providedIn: 'root',
})
export class SubAmenitiesService {
  apiName = 'Default';
  

  getByAmenitiesId = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SubAmenitiesDto[]>({
      method: 'GET',
      url: '/api/app/SubAmenitiess',
      params: { id },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
