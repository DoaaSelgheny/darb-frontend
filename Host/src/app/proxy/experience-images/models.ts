import type { ExperienceImageType } from './experience-image-type.enum';
import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface ExperienceImageCreateDto extends ExperienceImageCreateDtoBase {
}

export interface ExperienceImageCreateDtoBase {
  experienceId: number;
  experienceImageType: ExperienceImageType;
  imagePath: string;
}

export interface ExperienceImageDto extends ExperienceImageDtoBase {
}

export interface ExperienceImageDtoBase extends EntityDto<number> {
  experienceId: number;
  experienceImageType: ExperienceImageType;
  imagePath?: string;
  isMain: boolean;
}

export interface ExperienceImageUpdateDto extends ExperienceImageUpdateDtoBase {
}

export interface ExperienceImageUpdateDtoBase {
  experienceId: number;
  experienceImageType: ExperienceImageType;
  imagePath: string;
}

export interface GetExperienceImageListInput extends PagedAndSortedResultRequestDto {
  experienceId: number;
}

export interface GetExperienceImagesInput extends GetExperienceImagesInputBase {
}

export interface GetExperienceImagesInputBase extends PagedAndSortedResultRequestDto {
  experienceId?: number;
  filterText?: string;
  experienceImageType?: ExperienceImageType;
  imagePath?: string;
}
