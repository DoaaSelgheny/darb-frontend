import { isArray, LocalizationService } from '@abp/ng.core';
import { Component, Input, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VacationHomeHostService } from '@proxy/vacation-homes';
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
  @Input() id:any
  @Input() vacationHome:any
  isVisibleSaveAndExit :boolean = false
  constructor(private localizationService: LocalizationService,
     public holidayHomeService: VacationHomeHostService,
     private router: Router,
      private toaster: TosterService,
      private route:ActivatedRoute,
  ) {}
  form= new FormGroup({
    description: new FormControl(null, [Validators.required,Validators.minLength(30),
      Validators.maxLength(250)]),
      vacationHomeCategoryType: new FormControl(null),
  })
  lang = this.localizationService.currentLang;

  ngOnInit(): void {
    this.getLookupData()
    this.id =this.route.snapshot.paramMap.get('id')

    if(this.vacationHome){
      this.setValueToFormGroup(this.form as FormGroup, this.vacationHome);

    }
  }
  categories
  getLookupData(){

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
  goNext(){
    if (!this.validateCurrentPage()) {
      this.makeFormAsMarkAdDirty();
      this.isVisibleSaveAndExit = false;
      return;
    }
    this.isVisibleSaveAndExit = false;
     if (this.isSubset(this.vacationHome, this.form.value)) {
      this.emitNext.emit('5');
    }else{
    this.getCurrentSaveAction(true).subscribe(x => {
      this.localizationService.instant('::Host:VacationHome:successSave', 'Success');
      //debugger
      // this.emitNext.emit('1')
      if(this.id){
        this.emitNext.emit('5')
      }else{

        this.router.navigate(['/holiday-homes/add-edit-holiday-home',x.id])
      }
    });
  }
  }
  goBack(){
    this.emitNext.emit('3')
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
        id: this.id
      };
     return this.holidayHomeService.saveStep5ByInput(val);

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
  saveAndExit(){
    if (!this.validateCurrentPage()) {
      this.makeFormAsMarkAdDirty();
      this.isVisibleSaveAndExit = false;
      return;
    }
    this.isVisibleSaveAndExit = false;
    this.getCurrentSaveAction(true).subscribe(x => {
      this.localizationService.instant('::Host:VacationHome:successSave', 'Success');
      this.router.navigate(['/holiday-homes']);
    });
  }
  ngOnDestroy(): void {
    sessionStorage.removeItem('currentStep');
    localStorage.removeItem(this.id?.toString() ?? '');
  }
}
