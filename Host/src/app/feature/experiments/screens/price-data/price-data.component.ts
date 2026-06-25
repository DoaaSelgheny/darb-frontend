import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProgressService } from '../../../../../shared/ui-components/progress-group/service/progress.service';
import { ExperienceHostService } from '@proxy/experiences';
import { vaidationType } from 'src/shared/directives/vaidationTypeEnum';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TosterService } from 'src/shared/services/toster.service';
import { isArray, LocalizationService } from '@abp/ng.core';

@Component({
  selector: 'app-price-data',

  templateUrl: './price-data.component.html',
  styleUrl: './price-data.component.scss',
})
export class PriceDataComponent {
  @Output() emitNext = new EventEmitter<string>();
  @Input() id: any;
  vaidationTypeEnum = vaidationType;
  @Input() experience: any;
  form = new FormGroup({
    pricePerPerson: new FormControl(null, Validators.required),
  });
  isVisibleSaveAndExit: boolean = false;
  constructor(
    private progressService: ProgressService,
    public experimentService: ExperienceHostService,
    private localizationService: LocalizationService,

    private router: Router,
    private toaster: TosterService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.progressService.updateProgress(95);
    if (this.id) {
      this.experimentService.getWithNavigationProperties(Number(this.id)).subscribe((data: any) => {
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
  goBack() {
    this.emitNext.emit('4');
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
    //debugger
    const val = {
      ...this.form.value,
      id: this.id,
    };
    return this.experimentService.saveStep6ByInput(val as any);
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
  submitFunction() {
    this.isVisibleSaveAndExit = false;
    this.getCurrentSaveAction(true).subscribe(x => {
      this.toaster.success(
        this.localizationService.instant('::Host:VacationHome:successSave', 'Success'),
      );
      if (this.id) {
        this.emitNext.emit('6');
      } else {
        this.router.navigate(['/experiments/experiment-add-edit/', this.id]);
      }
    });
  }
  goNext() {
    if (!this.validateCurrentPage()) {
      this.makeFormAsMarkAdDirty();
      this.isVisibleSaveAndExit = false;
      return;
    }
    if (this.isSubset(this.experience, this.form.value)) {
      this.emitNext.emit('6');
    } else {
      this.submitFunction();
    }
  }
  validateCurrentPage(): boolean {
    return this.form?.valid;
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
}
