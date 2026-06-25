import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { VacationHomeTypeDisplayCategory } from './vacation-home-type-display-category.enum';

export interface ActivateDeactivateHomeTypeRequestDto {
  isActive: boolean;
}

export interface GetVacationHomeTypesInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  description?: string;
}

export interface VacationHomeTypeDto extends EntityDto<number> {
  arName?: string;
  enName?: string;
  iconPath?: string;
  iconName?: string;
  isActive: boolean;
  imageName?: string;
  imagePath?: string;
  description?: string;
  serviceFeesPercentage: number;
  category: VacationHomeTypeDisplayCategory;
}

export interface VacationHomeTypeRequestDto {
  arName: string;
  enName: string;
  iconName?: string;
  iconPath: string;
  imageName?: string;
  imagePath?: string;
  description?: string;
  serviceFeesPercentage: number;
  category: VacationHomeTypeDisplayCategory;
}

export interface VacationHomeTypeLookupDto {
  id: number;
  name?: string;
}
