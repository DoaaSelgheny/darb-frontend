import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { CategoryType } from './category-type.enum';

export interface GetCategoriesLookupRequest extends PagedAndSortedResultRequestDto {
  name?: string;
  type?: CategoryType;
}

export interface GetCategoriesLookupResponse {
  id: number;
  name?: string;
  type: CategoryType;
}

export interface GetCategoryCityPriceRequest {
  categoryId: number;
}

export interface GetCategoryCityPriceResponse {
  id: number;
  name?: string;
  price: number;
}
