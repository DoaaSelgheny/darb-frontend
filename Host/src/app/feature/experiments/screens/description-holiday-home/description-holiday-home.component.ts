import { isArray, LocalizationService } from '@abp/ng.core';
import { Component, Input, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AttendanceType, ExperienceHostService, LanguageType } from '@proxy/experiences';
import { MeanService, MeanType } from '@proxy/means';
import { MeanDto } from '@proxy/means/models';
import { Subscription } from 'rxjs';
import { TosterService } from 'src/shared/services/toster.service';

@Component({
  selector: 'app-description-holiday-home',
  templateUrl: './description-holiday-home.component.html',
  styleUrls: ['./description-holiday-home.component.scss'],
})
export class DescriptionHolidayHomeComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  maxLength: number = 500;
  maxLengthOtherDetails: number = 500;
  @Output() emitNext = new EventEmitter<string>();
  @Input() id: any;
  @Input() experience: any;
  isVisibleSaveAndExit: boolean = false;
  languageTypeEnum = LanguageType;
  attendanceTypeEnum = AttendanceType;
  means: MeanDto[];
  constructor(
    private localizationService: LocalizationService,
    public service: ExperienceHostService,
    private router: Router,
    private toaster: TosterService,
    private route: ActivatedRoute,
    private meansService: MeanService,
  ) {}
  form = new FormGroup({
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(30),
      Validators.maxLength(250),
    ]),

    moreDetails: new FormControl(null),
    languageType: new FormControl(null, [Validators.required]),
    attendanceType: new FormControl(null, [Validators.required]),
    meanIds: new FormControl(null, [Validators.required]),
  });
  lang = this.localizationService.currentLang;
  selectedFeature = [];
  ngOnInit(): void {
    this.getLookupData();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.service.getWithNavigationProperties(Number(this.id)).subscribe((data: any) => {
        this.experience = data.experience;
        this.setValueToFormGroup(this.form as FormGroup, this.experience);
        this.experience.meanIds.forEach(element => {
          this.toggleSelectType(element);
        });
      });
    }
  }
  isTypeSelected(type: any) {
    if (this.form.controls['languageType'].value == null) return false;
    return this.form.controls['languageType'].value == type;
  }
  selectType(type: any) {
    if (this.form.controls['languageType'].value == type) {
      this.form.controls['languageType'].setValue(null);
    } else this.form.controls['languageType'].setValue(type);
  }

  isTypeSelectedAttance(type: any) {
    if (this.form.controls['attendanceType'].value == null) return false;
    return this.form.controls['attendanceType'].value == type;
  }
  selectTypeAttance(type: any) {
    if (this.form.controls['attendanceType'].value == type) {
      this.form.controls['attendanceType'].setValue(null);
    } else this.form.controls['attendanceType'].setValue(type);
  }
  categories;
  getLookupData() {

    this.meansService.getList({ maxResultCount: 1000, type: MeanType.Experience }).subscribe({
      next: data => {
        this.means = data.items;
      },
    });

  }

  isTypeSelectedMeans(id: number) {
    return this.selectedFeature.includes(id);
  }

  toggleSelectType(id: number) {
    if (this.selectedFeature.includes(id)) {
      this.selectedFeature = this.selectedFeature.filter(i => i !== id);
    } else {
      this.selectedFeature.push(id);
    }
    this.updateFormControlValue();
  }
  selectedFeatureData = [];
  private updateFormControlValue() {
    if (this.selectedFeature.length) {
      const mainFacilitiesIds = this.means
        .filter(f => this.selectedFeature.includes(f.id))
        .map(f => f.id);
      this.selectedFeatureData = this.means.filter(f => this.selectedFeature.includes(f.id));

      this.form.controls['meanIds'].setValue(mainFacilitiesIds.length ? mainFacilitiesIds : []);
    } else {
      this.form.controls['meanIds'].setValue([]);
    }
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
  compareArraysUnordered(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }
    return arr1.sort().toString() === arr2.sort().toString();
  }
  isSubset(object1: any, object2: any): boolean {
    for (let key in object2) {
      // Check if object1 contains the key and the value is the same
      if (
        object2.hasOwnProperty(key) &&
        (Array.isArray(object1[key])
          ? !this.compareArraysUnordered(object1[key], object2[key])
          : object1[key] !== object2[key])
      ) {
        return false; // Return false if any key-value pair does not match
      }
    }

    return true; // All key-value pairs from object2 match in object1
  }
  goNext() {
    if (!this.validateCurrentPage()) {
      this.makeFormAsMarkAdDirty();
      this.isVisibleSaveAndExit = false;
      return;
    }
    if (this.isSubset(this.experience, this.form.value)) {
      this.emitNext.emit('3');
    } else {
      this.submitFunction();
    }
  }
  submitFunction() {
    this.isVisibleSaveAndExit = false;
    this.getCurrentSaveAction().subscribe(x => {
      this.toaster.success(
        this.localizationService.instant('::Host:VacationHome:successSave', 'Success'),
      );
      if (this.id) {
        this.emitNext.emit('3');
      } else {
        this.router.navigate(['/experiments/experiment-add-edit', x.id]);
      }
    });
  }
  goBack() {
    this.emitNext.emit('1');
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
  getCurrentSaveAction() {
    const val = {
      ...this.form.value,
      id: this.id,
    };
    return this.service.saveStep3ByInput(val as any);
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
  saveAndExit() {
    if (!this.validateCurrentPage()) {
      this.makeFormAsMarkAdDirty();
      this.isVisibleSaveAndExit = false;
      return;
    }
    this.isVisibleSaveAndExit = false;
    this.getCurrentSaveAction().subscribe(x => {
      this.localizationService.instant('::Host:VacationHome:successSave', 'Success');
      this.router.navigate(['/experiments']);
    });
  }
  ngOnDestroy(): void {
    sessionStorage.removeItem('currentStep');
    localStorage.removeItem(this.id?.toString() ?? '');
  }
}
