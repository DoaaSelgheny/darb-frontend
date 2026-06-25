import { isArray, LocalizationService } from '@abp/ng.core';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MeanDto, MeanService } from '@proxy/means';
import { VacationHomeHostService } from '@proxy/vacation-homes';
import { TosterService } from 'src/shared/services/toster.service';

@Component({
  selector: 'app-room-data',
  templateUrl: './room-data.component.html',
  styleUrl: './room-data.component.scss',
})
export class RoomDataComponent implements OnInit,OnDestroy{
  @Output() emitNext = new EventEmitter<string>();
  isVisibleSaveAndExit :boolean = false
  features :MeanDto[]
  selectedFeature=[]
  @Input() id:any

  @Input() vacationHome:any
  constructor(private fb: FormBuilder,
    private router: Router,
    private toaster: TosterService,
    public holidayHomeService: VacationHomeHostService,
    private route:ActivatedRoute,
    private localizationService: LocalizationService,
    private meansService:MeanService

  ) {

  }

  ngOnInit(): void {
    this.getLookupData()
    this.id =this.route.snapshot.paramMap.get('id')
    if(this.vacationHome){
      let meanLookup = this.vacationHome.vacationHomeMeans.map(x=>x.meanId)
      this.selectedFeature = meanLookup
      this.form.patchValue({
        meansLookup:meanLookup
      })

    }
  }
  getLookupData(){
   this.meansService.getAllList().subscribe({
    next:next=>{
      this.features =next
    }
   })
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
 form=new FormGroup({
  meansLookup: new FormControl(null),
  })
  isTypeSelected(id: number) {
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
  selectedFeatureData=[]
 private updateFormControlValue() {

      if (this.selectedFeature.length) {
        const mainFacilitiesIds = this.features
          .filter(f => this.selectedFeature.includes(f.id))
          .map(f => f.id);
        this.selectedFeatureData = this.features
        .filter(f => this.selectedFeature.includes(f.id))

        this.form.controls['meansLookup'].setValue(
          mainFacilitiesIds.length ? mainFacilitiesIds : [],
        );

      } else {
        this.form.controls['meansLookup'].setValue([]);
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
 if (this.isSubset({meansLookup:this.vacationHome.vacationHomeMeans.map(x=> x.meanId)}, this.form.value)) {
      this.emitNext.emit('4');
    }else{
    this.getCurrentSaveAction(true).subscribe(x => {
      this.toaster.success(

        this.localizationService.instant('::Host:VacationHome:successSave', 'Success')
      )

      if(this.id){
        this.emitNext.emit('4')
      }else{

        this.router.navigate(['/holiday-homes/add-edit-holiday-home',x.id])
      }
    });
  }
  }

  goBack(){
    this.emitNext.emit('2')
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
        meansLookup:this.form.value.meansLookup,
        id: this.id
      };
     return this.holidayHomeService.saveStep4ByInput(val);

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
      this.toaster.success(

        this.localizationService.instant('::Host:VacationHome:successSave', 'Success')
      )
      this.router.navigate(['/holiday-homes']);
    });
  }
  ngOnDestroy(): void {
    sessionStorage.removeItem('currentStep');
    localStorage.removeItem(this.id?.toString() ?? '');
  }
}
