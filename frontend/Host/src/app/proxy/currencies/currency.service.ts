import type { CurrencyCreateDto, CurrencyDto, CurrencyExcelDownloadDto, CurrencyUpdateDto, GetCurrenciesInput } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  apiName = 'Default';
  

  create = (input: CurrencyCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CurrencyDto>({
      method: 'POST',
      url: '/api/app/currencies',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/currencies/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CurrencyDto>({
      method: 'GET',
      url: `/api/app/currencies/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetCurrenciesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CurrencyDto>>({
      method: 'GET',
      url: '/api/app/currencies',
      params: { filterText: input.filterText, name: input.name, code: input.code, rateMin: input.rateMin, rateMax: input.rateMax, status: input.status, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: CurrencyExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/currencies/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, name: input.name, code: input.code, rateMin: input.rateMin, rateMax: input.rateMax, status: input.status },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CurrencyUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CurrencyDto>({
      method: 'PUT',
      url: `/api/app/currencies/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
