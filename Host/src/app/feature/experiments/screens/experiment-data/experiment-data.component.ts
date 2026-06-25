import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExperienceTypeDto } from '@proxy/experience-types';
import { CityDto } from '@proxy/cities';
import { vaidationType } from 'src/shared/directives/vaidationTypeEnum';
import { ActivatedRoute, Router } from '@angular/router';
import { TosterService } from 'src/shared/services/toster.service';
import { isArray, LocalizationService, SessionStateService } from '@abp/ng.core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExperienceHostService } from '@proxy/experiences/experience-host.service';
import { noWhitespaceOnlyValidator } from 'src/shared/directives/custom-validation';

@Component({
  selector: 'app-experiment-data',
  templateUrl: './experiment-data.component.html',
  styleUrl: './experiment-data.component.scss',
})
export class ExperimentDataComponent implements OnInit {
  form = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [
      Validators.required,
      noWhitespaceOnlyValidator(),
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    // cityId: new FormControl(null),
    experienceTypeId: new FormControl(null, [Validators.required]),
  });
  @Input() id;
  @Input() experience;
  @Input() experienceTypes: ExperienceTypeDto[];
  @Input() cities: CityDto[];
  @Output() cityChange = new EventEmitter<CityDto>();
  vaidationTypeEnum = vaidationType;
  @Output() emitNext = new EventEmitter<string>();
  isVisibleSaveAndExit: boolean = false;
  constructor(
    private router: Router,
    private toaster: TosterService,
    private localizationService: LocalizationService,
    private route: ActivatedRoute,
    private service: ExperienceHostService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.service.getWithNavigationProperties(Number(this.id)).subscribe((data: any) => {
        this.experience = data.experience;
        this.setValueToFormGroup(this.form as FormGroup, this.experience);
      });
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
  selectCity(id: number) {
    if (id == null) this.cityChange.emit(null);
    this.cityChange.emit(this.cities.find(x => x.id == id));
  }

  isTypeSelected(id: number) {
    if (!this.form.controls['experienceTypeId'].value) return false;
    return this.form.controls['experienceTypeId'].value == id;
  }

  selectType(id: number) {
    this.form.controls['experienceTypeId'].setValue(id);
  }
  validateCurrentPage(): boolean {
    return this.form?.valid;
  }
  isSubset(object1: any, object2: any): boolean {
    for (let key in object2) {
      // Check if object1 contains the key and the value is the same
      if (object2.hasOwnProperty(key) && object1[key] !== object2[key]) {
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
    if (this.id) {
      if (this.isSubset(this.experience, this.form.value)) {
        this.emitNext.emit('1');
      } else {
        this.submitFunction();
      }
    } else {
      this.submitFunction();
    }
  }
  submitFunction() {
    this.isVisibleSaveAndExit = false;
    this.getCurrentSaveAction(true).subscribe(x => {
      this.toaster.success(

        this.localizationService.instant('::Host:VacationHome:successSave', 'Success')
      )
      if (this.id) {
        this.emitNext.emit('1');
      } else {
        this.router.navigate(['/experiments/experiment-add-edit', x.id]);
      }
    });
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
      id: this.id ? Number(this.id) : null,
      name: this.form.value.name || '',
      experienceTypeId: this.form.value.experienceTypeId,
    };
    if (val.name) return this.service.saveStep1ByInput(val);
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
    this.getCurrentSaveAction(true).subscribe(x => {
      this.toaster.success(
        this.localizationService.instant('::Host:VacationHome:successSave', 'Success'),
      );
      this.router.navigate(['/experiments']);
    });
  }
  // ngOnDestroy(): void {
  //   // sessionStorage.removeItem('currentStep');
  //   // localStorage.removeItem(this.id?.toString() ?? '');
  // }
}
