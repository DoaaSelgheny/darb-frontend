import type { GetCategoriesLookupRequest, GetCategoriesLookupResponse, GetCategoryCityPriceRequest, GetCategoryCityPriceResponse } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiName = 'Default';
  

  getCategoryLookup = (input: GetCategoriesLookupRequest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<GetCategoriesLookupResponse>>({
      method: 'GET',
      url: '/api/app/category/category-lookup',
      params: { name: input.name, type: input.type, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getPricesByInput = (input: GetCategoryCityPriceRequest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetCategoryCityPriceResponse[]>({
      method: 'GET',
      url: '/api/app/category/prices',
      params: { categoryId: input.categoryId },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
