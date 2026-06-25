import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { markControlsAsDirty } from 'src/shared/utilties/markAsDirty';
import { ConfrontationTypes } from '../../../../../shared/ui-components/confrontation-popup/confrontation-types.enum';
import { vaidationType } from 'src/shared/directives/vaidationTypeEnum';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, combineLatest, map, of, switchMap } from 'rxjs';
import { TosterService } from 'src/shared/services/toster.service';
import { ServiceType } from '../coupon-table/coupon-table.component';
import { PromoCodeDto, PromoCodeService } from '../../services/promo-codes';
import { LookupRequestDto } from '@proxy/shared';
import { DiscountType } from '@proxy/shared/enums/discount-type.enum';
import { isWithinInterval } from 'date-fns';
interface ServiceData {
  id: number;
  displayName: string;
}

@Component({
  selector: 'app-coupon-edit',
  templateUrl: './coupon-edit.component.html',
  styleUrls: ['./coupon-edit.component.scss'],
})
export class CouponEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  serviceData: ServiceData[] = [];
  DiscountType = DiscountType;
  discountType: { value: DiscountType; label: string }[] = [
    { value: DiscountType.FixedValue, label: 'قيمة ثابتة' },
    { value: DiscountType.Percentage, label: 'نسبة' },
  ];
  today = this.convertDateTimeToDate(new Date());
  disabledDate = (current: Date): boolean => this.convertDateTimeToDate(current) < this.today;
  isDeletePopupOpen = false;
  isCreatePopupOpen = false;
  confrontationTypesEnum = ConfrontationTypes;
  validationTypeEnum = vaidationType;
  couponId: string = null;
  serviceType: ServiceType = null;
  serviceId = '';
  isCreateLoading = false;
  isUpdateLoading = false;
  isDeleteLoading = false;
  paramsSubscription: Subscription = new Subscription();
  discountTypeSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private toaster: TosterService,
    private route: ActivatedRoute,
    private promoCodeService: PromoCodeService,
    private router: Router,
  ) {}

  ngOnInit() {
    const PARAMS$ = this.route.paramMap;
    this.today = new Date();
    this.formBuilder();
    this.paramsSubscription = PARAMS$.pipe(
      switchMap(params => {
        this.couponId = params.get('couponId');
        this.serviceType = params.get('serviceType') as ServiceType;
        this.serviceId = params.get('serviceId');
        const COUPON$ = this.couponId ? this.promoCodeService.getForHost(this.couponId) : of(null);
        const SERVICE$ = this.handleServiceObservable(this.serviceType, this.serviceId);
        return combineLatest({ COUPON$, SERVICE$ });
      }),
    ).subscribe({
      next: data => {
        this.handleFormPatch(data.COUPON$, data.SERVICE$ as ServiceData[]);
      },
      error: error => {
        // Redirect user if he hasn't made this coupon
        if (error.status === 403) {
          this.router.navigate(['../']);
        }
      },
    });
    this.handleDiscountTypeChange();
  }
  formBuilder() {
    this.form = this.fb.group({
      couponCode: new FormControl(null),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      consumingCountPerUser: new FormControl(null, [Validators.required, Validators.min(1)]),
      discountType: new FormControl(null, Validators.required),
      discountValue: new FormControl(null, [Validators.required, Validators.min(1)]),
      serviceName: new FormControl(null, Validators.required),
      vacationHomeId: new FormControl(null),
      experienceId: new FormControl(null),
      startAndEndDate: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      isGlobal: new FormControl(false),
      concurrencyStamp: new FormControl(null),
      promoCodeDates: new FormControl([]),
    });
  }

  disabledDates(current: Date): boolean {
    // Disable dates before today
    if (this.today && current.getTime() < this.today.getTime()) {
      return true;
    }

    const promoCodeDates = this.form.get('promoCodeDates')?.value;

    // Check if promoCodeDates is valid
    if (!promoCodeDates || !promoCodeDates.length) {
      return false;
    }

    for (const date of promoCodeDates) {
      let startDate = new Date(date.startDate);
      // ensure start day is inclusive within the comparison interval (start date is exclusive so subtract a day to make it inclusive)
      startDate.setDate(startDate.getDate() - 1);
      let endDate = new Date(date.endDate);
      const isBookedBefore = isWithinInterval(current, { start: startDate, end: endDate });
      if (startDate && endDate && isBookedBefore) {
        return true;
      }
    }

    return false;
  }

  onCopy(value: string) {
    this.toaster.info(`Value copied: ${value}`);
  }

  handleFormPatch(couponData: PromoCodeDto, serviceData: ServiceData[]) {
    this.serviceData = serviceData;
    if (!couponData) {
      return;
    }
    this.form.patchValue(couponData);
    const DATE_RANGE = [couponData.startDate, couponData.endDate];
    this.form.get('startAndEndDate').setValue(DATE_RANGE);
    this.serviceData.length === 1 && this.form.get('serviceName').setValue(this.serviceData[0].id);
  }
  update() {
    this.handleDateSplit();
    this.handleService();
    if (this.form.invalid) {
      markControlsAsDirty(this.form);
      return;
    }
    this.isUpdateLoading = true;

    this.promoCodeService.updateForHost(this.couponId, this.form.value).subscribe(res => {
      this.isUpdateLoading = false;
      this.toaster.success('تم تعديل الكوبون بنجاح!');
      this.router.navigate(['marketing-tools/coupons']);
    });
  }
  create() {
    this.handleDateSplit();
    this.handleService();
    if (this.form.invalid) {
      markControlsAsDirty(this.form);
      return;
    }
    this.isCreateLoading = true;
    this.promoCodeService.createForHost(this.form.value).subscribe(result => {
      this.isCreateLoading = true;
      this.toaster.success('تم انشاء الكوبون بنجاح!');
      this.router.navigate(['marketing-tools/coupons']);
    });
  }

  handleDelete() {
    if (!this.couponId) {
      return;
    }
    this.isDeleteLoading = true;
    this.promoCodeService.delete(this.couponId).subscribe(res => {
      this.isDeleteLoading = false;

      this.isDeletePopupOpen = false;
      this.toaster.success('تم الحذف بنجاح!');
      this.router.navigate(['marketing-tools/coupons']);
    });
  }

  convertDateTimeToDate(dateTime: Date): Date {
    return new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
  }

  handleDiscountTypeChange() {
    this.discountTypeSubscription = this.form.get('discountType').valueChanges.subscribe(type => {
      // TODO set discountValue max validator based on the type fetched from BE
      if (type === DiscountType.FixedValue) {
        this.form.controls['discountValue'].reset();
        this.form.get('discountValue').setValidators(Validators.max(Infinity));
        this.form.updateValueAndValidity();
      }
      if (type === DiscountType.Percentage) {
        this.form.controls['discountValue'].reset();
        this.form.get('discountValue').setValidators(Validators.max(100));
        this.form.updateValueAndValidity();
      }
    });
  }
  handleServiceObservable(serviceType: ServiceType, serviceId?) {
    if (serviceType === ServiceType.EXPERIENCE) {
      return this.promoCodeService.getHostExperienceLookup({} as LookupRequestDto).pipe(
        map(data => {
          if (serviceId) {
            return data.filter(item => item.id == serviceId);
          }
          return data;
        }),
      );
    }
    if (serviceType === ServiceType.VACATION_HOME) {
      return this.promoCodeService.getHostVacationHomeLookup({} as LookupRequestDto).pipe(
        map(data => {
          if (serviceId) {
            return data.filter(item => item.id == serviceId);
          }
          return data;
        }),
      );
    }
    return of(null);
  }
  handleDateSplit() {
    const date = this.form.get('startAndEndDate').value;
    if (!date || date.length !== 2) {
      return;
    }
    this.form.get('startDate').setValue(date[0]);
    this.form.get('endDate').setValue(date[1]);
  }
  handleService() {
    const SERVICE_ID = this.form.get('serviceName').value;
    if (this.serviceType === ServiceType.EXPERIENCE) {
      this.form.get('experienceId').setValue(SERVICE_ID);
    }
    if (this.serviceType === ServiceType.VACATION_HOME) {
      this.form.get('vacationHomeId').setValue(SERVICE_ID);
    }
  }
  navigateToCouponTable() {
    this.router.navigate(['marketing-tools/coupons']);
  }
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    this.discountTypeSubscription.unsubscribe();
  }
}
