import { isArray, LocalizationService, SessionStateService } from '@abp/ng.core';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VacationHomeTypeDto } from '@proxy/vacation-home-types';
import { VacationHomeHostService, VacationHomeStatus } from '@proxy/vacation-homes';
import { noWhitespaceOnlyValidator } from 'src/shared/directives/custom-validation';
import { vaidationType } from 'src/shared/directives/vaidationTypeEnum';
import { TosterService } from 'src/shared/services/toster.service';

@Component({
  selector: 'app-home-data',
  templateUrl: './home-data.component.html',
  styleUrl: './home-data.component.scss',
})
export class HomeDataComponent implements OnInit {
  lang = this.sessionState.getLanguage();
  showStepModeButtons: boolean = false;
  @Output() emitNext = new EventEmitter<string>();
  id: string;
  vaidationTypeEnum = vaidationType;
  vacationHomeTypes: VacationHomeTypeDto[];
  isVisibleSaveAndExit: boolean = false;
  @Input() vacationHome: any;
  currentStep: number = 0;

  form = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [
      Validators.required,
      noWhitespaceOnlyValidator(),
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    // cityId: new FormControl(null),
    vacationHomeTypeId: new FormControl(null, [Validators.required]),
  });
  constructor(
    private sessionState: SessionStateService,
    public holidayHomeService: VacationHomeHostService,
    private router: Router,
    private toaster: TosterService,
    private localizationService: LocalizationService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getLookUp();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.GetData(this.id, true);
    }
  }
  //get data by Id
  private GetData(id: any, firstLoad: boolean = false) {
    this.holidayHomeService.getWithNavigationProperties(Number(id)).subscribe((data: any) => {
      this.vacationHome = data.vacationHome;
      this.setValueToFormGroup(this.form as FormGroup, this.vacationHome);
    });
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

  getLookUp() {
    // get vacationTypes in step 1
    this.holidayHomeService
      .getVacationHomeTypes({ maxResultCount: 1000 })
      .subscribe((data: VacationHomeTypeDto[]) => {
        this.vacationHomeTypes = data;
      });
  }

  isTypeSelected(id: number) {
    if (!this.form.controls['vacationHomeTypeId'].value) return false;
    return this.form.controls['vacationHomeTypeId'].value == id;
  }
  selectType(id: number) {
    if (this.form.controls['vacationHomeTypeId'].value == id) {
      this.form.controls['vacationHomeTypeId'].setValue(null);
    } else this.form.controls['vacationHomeTypeId'].setValue(id);
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
    this.isVisibleSaveAndExit = false;
    if(this.id){

      if (this.isSubset(this.vacationHome, this.form.value)) {
        this.emitNext.emit('1');
      }else{

        this.getCurrentSaveAction(true).subscribe(x => {
          this.toaster.success(
            this.localizationService.instant('::Host:VacationHome:successSave', 'Success'),
          );
            this.emitNext.emit('1');

        });
      }
    }else{
      this.getCurrentSaveAction(true).subscribe(x => {
        this.toaster.success(
          this.localizationService.instant('::Host:VacationHome:successSave', 'Success'),
        );
          this.router.navigate(['/holiday-homes/add-edit-holiday-home', x.id])

      });
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
      id: this.id ? Number(this.id) : null,
      name: this.form.value.name || '',
      vacationHomeTypeId: this.form.value.vacationHomeTypeId,
    };
    if (val.name) return this.holidayHomeService.saveStep1ByInput(val);
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
      this.router.navigate(['/holiday-homes']);
    });
  }
  // ngOnDestroy(): void {
  //   sessionStorage.removeItem('currentStep');
  //   localStorage.removeItem(this.id?.toString() ?? '');
  // }
}
