import { CoreModule, LocalizationService } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactusService } from '@proxy/contactuses';
import { FacilityService, GetFacilityDto, RatingsGuestService } from '@proxy/ratings';
import { ReservationType } from '@proxy/reservation-users';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { markAllAsDirty } from 'src/shared/helpers/markAllAsDirty';
import { SharedModule } from 'src/shared/shared.module';
import { ConfrontationTypes } from 'src/shared/ui-components/confrontation-popup/confrontation-types.enum';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [UiComponentsModule, RouterModule, CoreModule, SharedModule,
      NzModalModule,],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent implements OnInit{
  form: FormGroup;
  reserveType = ReservationType
  facilityRating :GetFacilityDto[]=[]
  isVisibleSend: boolean = false;
  lang = this.localizationService.currentLang;
  ratings = Array.from({ length: 10 }, (_, i) => i + 1);

  constructor(
    private toaster: ToasterService,
    private fb: FormBuilder,
    private facilityservice: FacilityService,
    private localizationService: LocalizationService,
    private ratingservice:RatingsGuestService,
    private modal: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: any,
  ) {
    
   
  }
  ngOnInit(): void {
    this.formBuilder();
    this.getFacility()
  }
  getFacility(){
    this.facilityservice.getFacilityListByServiceType(this.data.item.reservationType).subscribe({
      next:next=>{
        this.facilityRating = next
        this.populateFormArray()
      }
    })
  }
  formBuilder() {
    this.form = this.fb.group({
      reservationId:new FormControl(this.data.item.id),
      guestOpinion:new FormControl('',Validators.maxLength(250)),
      facilityRatings: this.fb.array([]) // Initialize the FormArray
    });
  }
  get facilityControls() {
    return (this.form.get('facilityRatings') as FormArray).controls;
  }
  populateFormArray(): void {
    const serviceArray = this.form.get('facilityRatings') as FormArray;
    this.facilityRating.forEach(facility => {
      serviceArray.push(this.fb.group({
        facilityId: [facility.id],
        facilityName:[this.lang === 'ar'? facility.nameAr : facility.nameEn],
        ratingValue: ['',Validators.required],
      }));
    });
  }
  setRating(index: number, rating: number): void {
    const control = (this.form.get('facilityRatings') as FormArray).at(index);
    control.patchValue({ ratingValue: rating });
  }
  sendMessage() {
    if (this.form.valid) {
      this.isVisibleSend = true;
      console.log(this.form.value);
      
      this.ratingservice
        .createRating({
          ...this.form.value,
        })
        .subscribe(data => {
          this.toaster.success(this.localizationService.instant('::guest:reserve:rating:sendRating'));
          this.modal.destroy();

        });
    } else {
      markAllAsDirty(this.form);
      this.toaster.error(this.localizationService.instant('::guest:reserve:rating:error'))
    }
  }
  openNewWindow(url: string) {
    window.open(url, '_blank');
  }
}
