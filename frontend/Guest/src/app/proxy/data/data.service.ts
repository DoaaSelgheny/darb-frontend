import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiName = 'Default';
  

  correctProfilePictures = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/data/correct-profile-pictures',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
