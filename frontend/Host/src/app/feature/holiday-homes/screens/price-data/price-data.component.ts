import { isArray, LocalizationService } from '@abp/ng.core';
import { TosterService } from 'src/shared/services/toster.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { VacationHomeHostService } from '@proxy/vacation-homes';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { vaidationType } from 'src/shared/directives/vaidationTypeEnum';
@Component({
  selector: 'app-price-data',
  templateUrl: './price-data.component.html',
  styleUrl: './price-data.component.scss',
})
export class PriceDataComponent implements OnInit, OnDestroy {
  lang: string;
  @Input() vacationHome = [];
  @Input() id: any;
  @Output() emitNext = new EventEmitter<string>();
  isVisibleSaveAndExit: boolean = false;
  subscriptions: Subscription = new Subscription();
  depositPercentage: number[] = [25,50,75,100]
  //  Array.from(
  //   { length: Math.floor((100 - 15) / 5) + 1 },
  //   (_, i) => 15 + i * 5
  // );
  vaidationTypeEnum = vaidationType;

  form = new FormGroup({
    midweekPrice: new FormControl(null, [Validators.required]),
    thursdayPrice: new FormControl(null, [Validators.required]),
    fridayPrice: new FormControl(null, [Validators.required]),
    saturdayPrice: new FormControl(null, [Validators.required]),
    depositPercentage: new FormControl(100, [Validators.required]),
  });
  constructor(
    public holidayHomeService: VacationHomeHostService,
    private localizationService: LocalizationService,
    private toaster: TosterService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}


  async ngOnInit() {
    this.lang = this.localizationService.currentLang;
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.vacationHome) {
      this.setValueToFormGroup(this.form as FormGroup, this.vacationHome);
      if (!this.form.controls['depositPercentage'].value) {
        this.form.controls['depositPercentage'].setValue(100);

      }
    }
  }
  isTypeSelected(id: number) {
    if (!this.form.controls['depositPercentage'].value) return false;
    return this.form.controls['depositPercentage'].value == id;
  }
  selectType(id: number) {
    if (this.form.controls['depositPercentage'].value == id) {
      this.form.controls['depositPercentage'].setValue(null);
    } else this.form.controls['depositPercentage'].setValue(id);
  }
  //handle form data when get by id
  setValueToFormGroup(form: FormGroup, data: any) {
    if (!form?.controls) return;
    //form.reset();
    for (let key in form.controls) {
      if (!!(form.controls[key] as any)?.controls) {
        if (isArray(data[key]))
          data[key].forEach(val => {
            (form.controls[key] as FormArray).controls.push(new FormControl(val));
          });
      } else {
        form.controls[key].setValue(data[key]);
      }
    }
  }

  validateCurrentPage(): boolean {
    return this.form?.valid;
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
     if (this.isSubset(this.vacationHome, this.form.value)) {
      this.emitNext.emit('7');
    }else{
    this.getCurrentSaveAction(true).subscribe(x => {
      this.toaster.success(
        this.localizationService.instant('::Host:VacationHome:successSave', 'Success'),
      );

      if (this.id) {
        this.emitNext.emit('7');
      } else {
        this.router.navigate(['/holiday-homes/add-edit-holiday-home', x.id]);
      }
    });
  }
  }
  goBack() {
    this.emitNext.emit('5');
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
        ////debugger;
        controls.markAsDirty();
      }
    });
  }
  getCurrentSaveAction(isDraft = false) {
    const val = {
      midweekPrice: this.form.value.midweekPrice,
      thursdayPrice: this.form.value.thursdayPrice,
      fridayPrice: this.form.value.fridayPrice,
      saturdayPrice: this.form.value.saturdayPrice,
      depositPercentage: this.form.value.depositPercentage,
      id: this.id,
    };
    return this.holidayHomeService.saveStep7ByInput(val);
  }
  saveAndExit() {
    if (!this.validateCurrentPage()) {
      this.makeFormAsMarkAdDirty();
      this.isVisibleSaveAndExit = false;
      return;
    }
    this.isVisibleSaveAndExit = false;
    this.getCurrentSaveAction(true).subscribe(x => {
      this.toaster.success(
        this.localizationService.instant('::Host:VacationHome:successSave', 'Success'),
      );
      this.router.navigate(['/holiday-homes']);
    });
  }
  ngOnDestroy(): void {
    sessionStorage.removeItem('currentStep');
    localStorage.removeItem(this.id?.toString() ?? '');
  }
}
