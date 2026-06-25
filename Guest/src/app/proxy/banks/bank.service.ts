import type { BankDto, GetBanksInput } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  apiName = 'Default';
  

  getByInput = (input: GetBanksInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<BankDto>>({
      method: 'GET',
      url: '/api/app/bank',
      params: { filterText: input.filterText, nameAr: input.nameAr, nameEn: input.nameEn, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
