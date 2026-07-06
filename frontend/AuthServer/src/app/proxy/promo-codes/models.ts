import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { DiscountType } from '../shared/enums/discount-type.enum';
import type { DiscountType } from '../shared/enums/models';
import type { VacationHomeDto } from '../vacation-homes/models';
import type { ExperienceDto } from '../experiences/models';

export interface GetPromoCodesInput extends GetPromoCodesInputBase {
}

export interface GetPromoCodesInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  couponCode?: string;
  startDateMin?: string;
  startDateMax?: string;
  endDateMin?: string;
  endDateMax?: string;
  consumingCountPerUserMin?: number;
  consumingCountPerUserMax?: number;
  discountType?: DiscountType;
  discountValueMin?: number;
  discountValueMax?: number;
  isGlobal?: boolean;
  isSuspended?: boolean;
  vacationHomeId?: number;
  experienceId?: number;
}

export interface PromoCodeCreateDto extends PromoCodeCreateDtoBase {
}

export interface PromoCodeCreateDtoBase {
  startDate?: string;
  endDate?: string;
  consumingCountPerUser: number;
  discountType: DiscountType;
  discountValue?: number;
  isGlobal: boolean;
  isSuspended: boolean;
  vacationHomeId?: number;
  experienceId?: number;
}

export interface PromoCodeDatesDto {
  startDate?: string;
  endDate?: string;
}

export interface PromoCodeDto extends PromoCodeDtoBase {
  promoCodeDates: PromoCodeDatesDto[];
}

export interface PromoCodeDtoBase extends FullAuditedEntityDto<string> {
  couponCode?: string;
  startDate?: string;
  endDate?: string;
  consumingCountPerUser: number;
  discountType: DiscountType;
  discountValue?: number;
  isGlobal: boolean;
  isSuspended: boolean;
  vacationHomeId?: number;
  experienceId?: number;
  concurrencyStamp?: string;
}

export interface PromoCodeExcelDownloadDto extends PromoCodeExcelDownloadDtoBase {
}

export interface PromoCodeExcelDownloadDtoBase {
  downloadToken?: string;
  filterText?: string;
  couponCode?: string;
  startDateMin?: string;
  startDateMax?: string;
  endDateMin?: string;
  endDateMax?: string;
  consumingCountPerUserMin?: number;
  consumingCountPerUserMax?: number;
  discountType?: DiscountType;
  discountValueMin?: number;
  discountValueMax?: number;
  isGlobal?: boolean;
  isSuspended?: boolean;
  vacationHomeId?: number;
  experienceId?: number;
}

export interface PromoCodeUpdateDto extends PromoCodeUpdateDtoBase {
}

export interface PromoCodeUpdateDtoBase {
  couponCode: string;
  startDate?: string;
  endDate?: string;
  consumingCountPerUser: number;
  discountType: DiscountType;
  discountValue?: number;
  isGlobal: boolean;
  isSuspended: boolean;
  vacationHomeId?: number;
  experienceId?: number;
  concurrencyStamp?: string;
}

export interface PromoCodeWithNavigationPropertiesDto extends PromoCodeWithNavigationPropertiesDtoBase {
}

export interface PromoCodeWithNavigationPropertiesDtoBase {
  promoCode: PromoCodeDto;
  vacationHome: VacationHomeDto;
  experience: ExperienceDto;
}

export interface ServiceLookUp {
  id: number;
  displayName?: string;
  maxOfDiscount: number;
}
