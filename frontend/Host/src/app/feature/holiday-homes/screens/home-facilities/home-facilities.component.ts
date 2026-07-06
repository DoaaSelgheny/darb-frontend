import {  LocalizationService, SessionStateService } from '@abp/ng.core';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AmenitiesDto, AmenitiesService, AmenitiesType } from '@proxy/amenitiess';
import { SubAmenitiesService } from '@proxy/sub-amenitiess';
import { VacationHomeHostService } from '@proxy/vacation-homes';
import { forkJoin, map,  switchMap } from 'rxjs';
import { vaidationType } from 'src/shared/directives/vaidationTypeEnum';
import { TosterService } from 'src/shared/services/toster.service';

@Component({
  selector: 'app-home-facilities',
  templateUrl: './home-facilities.component.html',
  styleUrl: './home-facilities.component.scss',
})
export class HomeFacilitiesComponent implements OnInit,OnDestroy {
  form: FormGroup;
  AmenitiesType = AmenitiesType;

  mainFacilities: AmenitiesDto[] = [];
  selectedFacilities = [];
  isSiteLanguageArabic = false;
  isSelectedFacilities = false;
  @Output() emitNext = new EventEmitter<string>();
  @Input() id: any;
  isVisibleSaveAndExit: boolean = false;
  @Input() vacationHome: any;
  validationTypeEnum = vaidationType;
  facilitiesWithSubs = [];
  selectedMainFacilitiesData = [];

  constructor(
    public holidayHomeService: VacationHomeHostService,
    private sessionState: SessionStateService,
    private amenitiesService: AmenitiesService,
    private router: Router,
    private toaster: TosterService,
    private route: ActivatedRoute,
    private SubAmenitiessService: SubAmenitiesService,
    private cdr: ChangeDetectorRef,
    private localizationService: LocalizationService,
    private fb: FormBuilder,
  ) {
    this.form = new FormGroup({
      areaString: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(9),
      ]),
      amenities: new FormArray([]),
    });
  }

  get formArrayControls(): any {
    return (this.form.get('amenities') as FormArray).controls;
  }

  ngOnInit(): void {
    this.isSiteLanguageArabic = this.sessionState.getLanguage() === 'ar';
    this.id = this.route.snapshot.paramMap.get('id');
    this.getLookUp();
    setTimeout(() => {

      if (this.vacationHome) {
        this.patchVacationHomeAmenities(this.vacationHome.vacationHomeAmenities);
        this.form.patchValue({
          area: this.vacationHome.area,
          areaString: this.vacationHome.areaString,
        });
        this.changeBackEndData()
      }
    }, 2000);
  }

  //Add main and sub faciities in one array
  getLookUp() {
    this.amenitiesService
      .getList({ maxResultCount: 1000 })
      .pipe(
        switchMap(mainFacilities => {
          // Map each main facility to an observable that fetches its sub-facilities
          this.mainFacilities = mainFacilities.items?.filter(a => a.isMainFacility) ?? [];

          const facilitiesWithSubs$ = this.mainFacilities.map(main =>
            this.SubAmenitiessService.getByAmenitiesId(main.id).pipe(
              map(subFacilities => ({ ...main, subFacilities })),
            ),
          );
          // Use forkJoin to wait for all requests to complete
          return forkJoin(facilitiesWithSubs$);
        }),
      )
      .subscribe(result => {
        this.facilitiesWithSubs = result;
      });
  }

  // fill the array with selected sub facilities
  toggleSubType(subFacilityId: string, mainFacilityId: string) {
    const amenitiesArray = this.form.get('amenities') as FormArray;

    // Find the form group for the specified main facility
    const facilityGroup = amenitiesArray.controls.find(
      (group: FormGroup) => group.get('amintieId')?.value === mainFacilityId,
    );

    if (facilityGroup) {
      const subFacilitiesControl = facilityGroup.get('subAmintiesVacationHomeDto');
      const selectedSubFacilities = subFacilitiesControl?.value || [];

      // Check if the sub-facility is already selected
      const index = selectedSubFacilities.findIndex(
        (sub: any) => sub.subAmintieId === subFacilityId,
      );

      if (index > -1) {
        // If sub-facility is selected, remove it
        selectedSubFacilities.splice(index, 1);
      } else {
        // If not selected, add it as an object with subAmintieId key
        selectedSubFacilities.push({ subAmintieId: subFacilityId });
      }

      // Update the form control with the modified array
      subFacilitiesControl.setValue(selectedSubFacilities);
    }
  }

  // Check if a sub-facility is selected for a given main facility
  isTypeSub(subFacilityId: string, mainFacilityId: string): boolean {
    const amenitiesArray = this.form.get('amenities') as FormArray;

    // Find the form group for the specified main facility
    const facilityGroup = amenitiesArray.controls.find(
      (group: FormGroup) => group.get('amintieId')?.value === mainFacilityId,
    );

    if (facilityGroup) {
      const selectedSubFacilities = facilityGroup.get('subAmintiesVacationHomeDto')?.value || [];
      return selectedSubFacilities.some((sub: any) => sub.subAmintieId === subFacilityId);
    }
    return false;
  }

  // Check if a main facility is selected
  isTypeSelected(id: string, type: string) {
    if (type === 'mainFaclities') {
      return this.selectedFacilities.includes(id);
    }
  }

  //fill the array with selected main facilities
  toggleSelectType(id: string, type: string) {
    if (type === 'mainFaclities') {
      if (this.selectedFacilities.includes(id)) {
        this.selectedFacilities = this.selectedFacilities.filter(i => i !== id);
      } else {
        this.selectedFacilities.push(id);
      }

      this.updateFormControlValue('mainFaclities');
    }
  }

  //Fill Form with selected main & sub
  private updateFormControlValue(type: string) {
    const amenitiesArray = this.form.get('amenities') as FormArray;
    if (type === 'mainFaclities') {
      if (this.selectedFacilities.length) {
        this.isSelectedFacilities = true;

        // include only selected ones
        this.selectedMainFacilitiesData = this.facilitiesWithSubs.filter(f =>
          this.selectedFacilities.includes(f.id),
        );
        // Remove facilities from FormArray that are no longer selected
        for (let i = amenitiesArray.length - 1; i >= 0; i--) {
          const facilityId = amenitiesArray.at(i).get('amintieId').value;
          if (!this.selectedFacilities.includes(facilityId)) {
            amenitiesArray.removeAt(i); // Remove unselected facility
          }
        }
        this.selectedMainFacilitiesData.forEach(facility => {
          // Check if facility is already in the form array
          let facilityGroup = amenitiesArray.controls.find(
            (group: FormGroup) => group.get('amintieId').value === facility.id,
          );
          if (!facilityGroup) {
            // Add new facility if it does not exist in the form array
            facilityGroup = new FormGroup({
              nameAr: new FormControl(facility.nameAr),
              amintieId: new FormControl(facility.id),
              count: new FormControl(facility.count || 1, [Validators.required, Validators.min(1)]),
              bedNo: new FormControl(facility.bedNo || 1, [Validators.required, Validators.min(1)]),
              subAmintiesVacationHomeDto: new FormControl([]),
            });
            amenitiesArray.push(facilityGroup);
          }
          else {
            // Update sub-facilities if the facility is already in the form array
            // facilityGroup.value.forEach(element => {

            //   element.get('subAmintiesVacationHomeDto')?.setValue(null);
            // });
          }
        });
        this.cdr.detectChanges();
      } else {
        this.isSelectedFacilities = false;
        amenitiesArray.clear(); // Clear all if no facilities are selected
      }
    }
  }

  validateCurrentPage(): boolean {
    return this.form?.valid && this.selectedFacilities.length > 0;
  }
  changedAmenities=[]
  changeBackEndData(){
    this.vacationHome.vacationHomeAmenities.forEach(element => {
      this.changedAmenities.push({
        amintieId:element.amenitiesId,
        bedNo:element.guestCountPerAmenity,
        count:element.count,
        nameAr:element.amenities.nameAr,
        subAmintiesVacationHomeDto:element.vacationHomeSubAmenities.map(subelement => ({
          subAmintieId: subelement.subAmenitiesId,
          nameAr: subelement.subAmenities.nameAr
        }))
      })
    });
  }
 isSubset(object1: any, object2: any): boolean {
    // If object2 is not an object or array, perform a direct comparison
    if (typeof object2 !== 'object' || object2 === null) {
      return object1 === object2;
    }

    // If object2 is an array, check if every element in object2 is present in object1
    if (Array.isArray(object2)) {
      if (!Array.isArray(object1)) {
        return false; // Mismatch: one is an array and the other is not
      }
      return object2.every((item2) =>
        object1.some((item1) => this.isSubset(item1, item2))
      );
    }

    // If object2 is an object, check if all keys in object2 exist in object1 with matching values
    for (const key in object2) {
      if (object2.hasOwnProperty(key)) {
        if (!object1.hasOwnProperty(key) || !this.isSubset(object1[key], object2[key])) {
          return false;
        }
      }
    }

    return true; // All keys and values in object2 match in object1
  }


  goNext() {
    if (!this.validateCurrentPage()) {
      this.makeFormAsMarkAdDirty();
      this.isVisibleSaveAndExit = false;
      return;
    }
    this.isVisibleSaveAndExit = false;
    if (this.isSubset({
      amenities:this.changedAmenities,
      areaString:this.vacationHome.areaString
    }, this.form.value)) {
      this.emitNext.emit('3');
    }else{
    this.getCurrentSaveAction(true).subscribe(x => {
      this.localizationService.instant('::Host:VacationHome:successSave', 'Success');
      if (this.id) {
        this.emitNext.emit('3');
      } else {
        this.router.navigate(['/holiday-homes/add-edit-holiday-home', x.id]);
      }
    });
  }
  }
  goBack() {
    this.emitNext.emit('1');
  }
  //handle form data when get by id
  patchVacationHomeAmenities(vacationHomeAmenities: any[]) {
    const amenitiesArray = this.form.get('amenities') as FormArray;
    amenitiesArray.clear(); // Clear existing controls if any
    vacationHomeAmenities.forEach(amenity => {

      // this.toggleSelectType(amenity.amenitiesId,'mainFaclities')

      const amenityGroup = this.fb.group({
        nameAr: [this.isSiteLanguageArabic ? amenity.amenities.nameAr : amenity.amenities.nameEn],
        amintieId: [amenity.amenitiesId],
        count: [amenity.count, [Validators.required, Validators.min(1)]],
        bedNo: [amenity.guestCountPerAmenity, [Validators.required, Validators.min(1)]],
        subAmintiesVacationHomeDto: this.fb.array(
          amenity.vacationHomeSubAmenities?.map((sub: any) =>
            this.fb.group({
              subAmintieId: [sub.subAmenitiesId],
              nameAr:[sub.subAmenities.nameAr]
            }),
          ) || [],
        ),
      });
      amenitiesArray.push(amenityGroup);
      // this.toggleSelectType(amenity.amenitiesId,'mainFaclities')
    });
    this.selectedFacilities = vacationHomeAmenities.map(i => i.amenitiesId);

      this.updateFormControlValue('mainFaclities');
  }
  saveDraft() {
    if (!this.validateCurrentPage()) {
      this.makeFormAsMarkAdDirty();
      this.isVisibleSaveAndExit = false;
      return;
    } else {
      this.isVisibleSaveAndExit = true;
    }
  }
  //make form marked
  makeFormAsMarkAdDirty() {
    Object.keys(this.form.controls).forEach(key => {
      var controls = this.form.get(key);
      if (controls instanceof FormControl) {
        controls.markAsDirty();
      }
    });
  }
  getCurrentSaveAction(isDraft = false) {
    const val = {
      ...this.form.value,
      id: this.id,
    };
    return this.holidayHomeService.saveStep3ByInput(val);
  }
  saveAndExit() {
    if (!this.validateCurrentPage()) {
      this.makeFormAsMarkAdDirty();
      this.isVisibleSaveAndExit = false;
      return;
    }
    this.isVisibleSaveAndExit = false;
    this.getCurrentSaveAction(true).subscribe(x => {
      this.toaster.success('تم حفظ البيانات بنجاح');
      this.router.navigate(['/holiday-homes']);
    });
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('currentStep');
    localStorage.removeItem(this.id?.toString() ?? '');
  }
}
