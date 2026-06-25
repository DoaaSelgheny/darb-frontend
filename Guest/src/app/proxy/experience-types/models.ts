import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface ActivateDeactivateExperienceTypeRequestDto {
  isActive: boolean;
}

export interface ExperienceTypeCreateDto {
  name: string;
  imageName?: string;
  imagePath?: string;
  description?: string;
  iconName?: string;
  iconPath?: string;
  serviceFeesPercentage: number;
}

export interface ExperienceTypeDto extends FullAuditedEntityDto<number> {
  name?: string;
  iconName?: string;
  iconPath?: string;
  imageName?: string;
  imagePath?: string;
  description?: string;
  concurrencyStamp?: string;
  isActive: boolean;
  serviceFeesPercentage: number;
}

export interface ExperienceTypeExcelDownloadDto {
  downloadToken?: string;
  filterText?: string;
  name?: string;
  imageName?: string;
  imagePath?: string;
  description?: string;
  iconName?: string;
  iconPath?: string;
  serviceFeesPercentage: number;
}

export interface ExperienceTypeUpdateDto {
  name: string;
  iconName?: string;
  iconPath?: string;
  imageName?: string;
  imagePath?: string;
  description?: string;
  serviceFeesPercentage: number;
  concurrencyStamp?: string;
}

export interface GetExperienceTypesInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  name?: string;
  description?: string;
  icon?: string;
}

export interface ExperienceTypeLookupDto {
  id: number;
  name?: string;
}
