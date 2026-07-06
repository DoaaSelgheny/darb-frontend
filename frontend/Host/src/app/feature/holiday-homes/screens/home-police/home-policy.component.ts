import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { isArray, LocalizationService } from '@abp/ng.core';
import { Router, ActivatedRoute } from '@angular/router';
import { VacationHomeHostService } from '@proxy/vacation-homes';
import { Subscription } from 'rxjs';
import { TosterService } from 'src/shared/services/toster.service';
import {
  CancellationAndReturnPolicyDto,
  CancellationAndReturnPolicyService,
} from '@proxy/cancellation-and-return-policies';
import { vaidationType } from 'src/shared/directives/vaidationTypeEnum';

@Component({
  selector: 'app-home-policy',
  templateUrl: './home-policy.component.html',
  styleUrl: './home-policy.component.scss',
})
export class HomePolicyComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  @Output() emitNext = new EventEmitter<string>();
  @Input() id: any;
  @Input() vacationHome: any;
  isVisibleSaveAndExit: boolean = false;
  cancellationAndReturnPolicy: CancellationAndReturnPolicyDto[];
  vaidationTypeEnum = vaidationType;

  constructor(
    private localizationService: LocalizationService,
    public holidayHomeService: VacationHomeHostService,
    private router: Router,
    private toaster: TosterService,
    private route: ActivatedRoute,
    private cancelationPloicyService: CancellationAndReturnPolicyService,
  ) {}
  form = new FormGroup({
    cancellationAndReturnPolicyId: new FormControl(null, [Validators.required]),
    conditionsReservation: new FormControl(null),
    isRefunded: new FormControl(false),
    deposit: new FormControl(null),
  });
  lang = this.localizationService.currentLang;

  ngOnInit(): void {
    this.getLookupData();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.vacationHome) {
      this.setValueToFormGroup(this.form as FormGroup, this.vacationHome);
    }
  }

  getLookupData() {
    this.cancelationPloicyService.getAllList().subscribe({
      next: next => {
        this.cancellationAndReturnPolicy = next;
      },
    });
  }

  isTypeSelected(id: number) {
    if (!this.form.controls['cancellationAndReturnPolicyId'].value) return false;
    return this.form.controls['cancellationAndReturnPolicyId'].value == id;
  }
  selectType(id: number) {
    if (this.form.controls['cancellationAndReturnPolicyId'].value == id) {
      this.form.controls['cancellationAndReturnPolicyId'].setValue(null);
    } else this.form.controls['cancellationAndReturnPolicyId'].setValue(id);
  }

  updateAllChecked(e) {
    if (e) {
      this.form.get('deposit').setValidators(Validators.required);
      this.form.updateValueAndValidity();
    } else {
      this.form.get('deposit').setValidators(null);
      this.form.get('deposit').setValue(null)
      this.form.updateValueAndValidity();
    }
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
  //handle form data when get by id
  setValueToFormGroup(form: FormGroup, data: any) {
    if (!form?.controls) return;
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
      this.emitNext.emit('6');
    }else{
    this.getCurrentSaveAction(true).subscribe(x => {
      this.toaster.success(
        this.localizationService.instant('::Host:VacationHome:successSave', 'Success'),
      );
      if (this.id) {
        this.emitNext.emit('6');
      } else {
        this.router.navigate(['/holiday-homes/add-edit-holiday-home', x.id]);
      }
    });
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
        controls.markAsDirty();
      }
    });
  }
  getCurrentSaveAction(isDraft = false) {
    const val = {
      cancellationAndReturnPolicyId: this.form.value.cancellationAndReturnPolicyId,
      conditionsReservation: this.form.value.conditionsReservation,
      isRefunded: this.form.value.isRefunded,
      deposit: this.form.value.deposit,
      id: this.id,
    };
    return this.holidayHomeService.saveStep6ByInput(val);
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
