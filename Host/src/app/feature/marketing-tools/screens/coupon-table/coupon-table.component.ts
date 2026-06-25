import { Component, OnInit } from '@angular/core';
import { TosterService } from 'src/shared/services/toster.service';
import {
  PromoCodeService,
  PromoCodeWithNavigationPropertiesDtoBase,
} from '../../services/promo-codes';
import { GetPromoCodesInput } from '@proxy/promo-codes';
import { DiscountType } from '../../../../proxy/shared/enums/discount-type.enum';
import { ConfrontationTypes } from 'src/shared/ui-components/confrontation-popup/confrontation-types.enum';
import { finalize } from 'rxjs';
export enum ServiceType {
  VACATION_HOME = 'VACATION_HOME',
  EXPERIENCE = 'EXPERIENCE',
}
@Component({
  selector: 'app-coupon-table',
  templateUrl: './coupon-table.component.html',
  styleUrls: ['./coupon-table.component.scss'],
})
export class CouponTableComponent implements OnInit {
  isLoading = false;
  isVisibleMasg = false;
  confrontationTypesEnum = ConfrontationTypes;
  couponData: PromoCodeWithNavigationPropertiesDtoBase[] = [];
  public serviceType = ServiceType;
  selectedCouponCode: string = null;
  isDeleteLoading = false;
  currentPage = 1;
  itemsPerPage = 10;
  totalCount = 0;

  constructor(
    private toaster: TosterService,
    private promoCodeService: PromoCodeService,
  ) {}

  ngOnInit(): void {
    this.getData(this.currentPage);
  }

  getData(pageIndex: number) {
    this.currentPage = pageIndex;
    this.isLoading = true;
    this.promoCodeService
      .getHostList({
        maxResultCount: this.itemsPerPage,
        skipCount: (this.currentPage - 1) * this.itemsPerPage,
      } as GetPromoCodesInput)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(couponData => {
        this.couponData = couponData.items;
        this.totalCount = couponData.totalCount;
      });
  }
  handleSwitchChange(activeState: boolean, id: string) {
    this.promoCodeService.hostSuspended(id, !activeState).subscribe(res => {
      this.couponData = this.couponData.map(data => {
        if (data.promoCode.id === id) {
          data.promoCode.isSuspended = !activeState;
        }
        return data;
      });
    });
  }
  showDeletePopup(caponCode: string) {
    this.isVisibleMasg = true;
    this.selectedCouponCode = caponCode;
  }
  handleDelete() {
    if (!this.selectedCouponCode) {
      return;
    }
    this.isDeleteLoading = true;
    this.promoCodeService.delete(this.selectedCouponCode).subscribe(res => {
      this.isDeleteLoading = false;
      this.isVisibleMasg = false;
      this.couponData = this.couponData.filter(
        data => data['promoCode'].id !== this.selectedCouponCode,
      );
      this.toaster.success('تم الحذف بنجاح!');
    });
  }
  onCopy(value: string) {
    navigator.clipboard.writeText(value);
    this.toaster.info(`Value copied: ${value}`);
  }
  determineServiceType(vacationHomeId) {
    if (vacationHomeId) {
      return ServiceType.VACATION_HOME;
    }
    return ServiceType.EXPERIENCE;
  }
  handleServiceLabel(vacationHomeId) {
    if (!!vacationHomeId) {
      return { key: '::host:coupon:table:HolidayHomeListItem', defaultValue: 'بيت عطلة' };
    }

    return { key: '::host:coupon:table:ExperienceListItem', defaultValue: 'تجربة' };
  }
  handleDiscountLabel(discountType: DiscountType) {
    if (discountType === DiscountType.FixedValue) {
      return { key: '::host:coupon:table:DiscountFixedValue', defaultValue: 'ر.س' };
    }
    return { key: '::host:coupon:table:DiscountPercentageValue', defaultValue: '%' };
  }
}
