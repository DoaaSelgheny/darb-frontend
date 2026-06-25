// import { BookingTypeDto } from '../../../../proxy/booking-types/models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { isArray, LocalizationService } from '@abp/ng.core';
import { differenceInCalendarDays } from 'date-fns';
import { Subscription } from 'rxjs';
import { ToasterService } from '@abp/ng.theme.shared';
import { AREA_SIZE, POSITIVE_NUMBERS } from 'src/shared/directives/validation-regex';
import { Router, ActivatedRoute } from '@angular/router';
import { VacationHomeHostService } from '@proxy/vacation-homes';
import { TosterService } from 'src/shared/services/toster.service';
import { vaidationType } from 'src/shared/directives/vaidationTypeEnum';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'], // Fixed typo from `styleUrl` to `styleUrls`
})
export class AvailabilityComponent implements OnInit{

  form = new FormGroup({
      bookingTypeId: new FormControl(null),
      vacationHomeReservationWay:new FormControl(null, [Validators.required]),
      accessTime: new FormControl(null, [Validators.required]),
      leaveTime: new FormControl(null, [Validators.required]),
      isAddMinReservation:new FormControl(false),
      minimumHomeReservationAmount: new FormControl(null, [
        Validators.minLength(1),
        Validators.maxLength(4),
      ]),
    })
  subscriptions: Subscription = new Subscription();
   @Output() emitNext = new EventEmitter<string>();
  @Input() id:any
  @Input() vacationHome:any
  isVisibleSaveAndExit :boolean = false
  lang = this.localizationService.currentLang;
  bookingTypes = [
      { id: 1, nameEn: 'Instant Booking', nameAr: 'حجز فوري', nameZh: '即时预订' },
      // { id: 2, nameEn: 'Approval', nameAr: 'حجز يتطلب موافقة', nameZh: '预订需要批准' },
    ];
    vaidationTypeEnum = vaidationType;

  constructor(
    private localizationService: LocalizationService,
 public holidayHomeService: VacationHomeHostService,
    private router: Router,
    private toaster: TosterService,
    private route:ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.id =this.route.snapshot.paramMap.get('id')
    if(this.vacationHome){
      let leaveTime = this.convertTo12HourFormat(this.vacationHome.leaveTime);
      let accessTime = this.convertTo12HourFormat(this.vacationHome.accessTime);
      this.setValueToFormGroup(this.form as FormGroup, this.vacationHome);
      this.form.patchValue({
        leaveTime:leaveTime,
        accessTime:accessTime
      })
      if(this.vacationHome.minimumHomeReservationAmount ){
        this.form.patchValue({
          isAddMinReservation:true,
          leaveTime:leaveTime,
          accessTime:accessTime,
        })
      }

      this.form.patchValue({
        vacationHomeReservationWay:this.bookingTypes[0].id
      })

    }

    setTimeout(() => {
    
      let leaveTime = this.form.get('leaveTime').value;
      let accessTime = this.form.get('accessTime').value;
      if (accessTime && leaveTime &&   this.isTimeEarlier(
        this.convertTo24HourFormat( this.form.get('leaveTime').value),
        this.convertTo24HourFormat(this.form.get('accessTime').value),
      )) {
        this.form.get('leaveTime').setErrors({ lessThanAccessTime: true });
        this.form.get('leaveTime').updateValueAndValidity();
      }
    }, 100);

    this.subscriptions.add(
      this.form.get('accessTime')?.valueChanges.subscribe(value => {
        //debugger;
        let leaveTime = this.form.get('leaveTime')?.value;
        if (value && leaveTime &&   this.isTimeEarlier(
          this.convertTo24HourFormat( this.form.get('leaveTime').value),
          this.convertTo24HourFormat(this.form.get('accessTime').value),
        )) {
          this.form.get('leaveTime').setErrors({ lessThanAccessTime: true });
        } else {
          delete this.form.get('leaveTime').errors.lessThanAccessTime;
          this.updateData()

        }
      }),
    );

    this.subscriptions.add(
      this.form.get('leaveTime')?.valueChanges.subscribe(value => {
        //debugger;

        let accessTime = this.form.get('accessTime')?.value;

        if (value && accessTime && this.isTimeEarlier(
          this.convertTo24HourFormat( this.form.get('leaveTime').value),
          this.convertTo24HourFormat(this.form.get('accessTime').value),
        )) {
          this.form.get('leaveTime').setErrors({ lessThanAccessTime: true });
        } else {
          delete this.form.get('leaveTime').errors.lessThanAccessTime;
          this.updateData()
        }
      }),
    );
    this.form.patchValue({
      vacationHomeReservationWay:this.bookingTypes[0].id
    })
  }
  convertTimeStringToDate(timeString: string): Date {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0); // Set hours, minutes, seconds, and milliseconds
    return date;
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
updateAllChecked(e){
  if(e){
    this.form.get('minimumHomeReservationAmount').setValidators(Validators.required);
    this.form.updateValueAndValidity();
  }else {
    this.form.get('minimumHomeReservationAmount').setValidators(null);
    this.form.updateValueAndValidity();
  }
}

  validateCurrentPage(): boolean {
    return this.form?.valid;
  }
  updateData(){
    var accessTime = this.form.get('accessTime')?.value;
    const leaveTime = this.form.get('leaveTime')?.value;
    if (accessTime && leaveTime) {
      // Process or format the times as needed (for example, using DatePipe or Date object)
      const formattedAccessTime = new Date(accessTime).toLocaleTimeString('en-US', {
        hour12: false,
      });
      const formattedLeaveTime = new Date(leaveTime).toLocaleTimeString('en-US', {
        hour12: false,
      });

      // Set the formatted values back to the form controls
      this.form.get('accessTime')?.setValue(formattedAccessTime);
      this.form.get('leaveTime')?.setValue(formattedLeaveTime);

      // Mark the form controls as 'dirty' so Angular knows they have changed
      this.form.get('accessTime')?.markAsDirty();
      this.form.get('leaveTime')?.markAsDirty();
  }
}
isValidTime=true;
  //new time

  isTimeEarlier(time1: string, time2: string): boolean {
    if(time1&& time2){
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    // Convert to total minutes since midnight
    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;

    // Compare the total minutes
    return totalMinutes1 < totalMinutes2;}
  }
  convertTo24HourFormat(time: string): string {
    if(time){
    const [timePart, meridian] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (meridian === 'PM' && hours !== 12) {
      hours += 12;
    } else if (meridian === 'AM' && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
     } }
  convertTo12HourFormat(time24: string): string {
    if(time24){
    const [hours, minutes, seconds] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12; // Convert 0 or 12 to 12, others to their modulo
    return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`;}
  }

  handleTime(date: any) {
    // const dateN = new Date(date);

    // const hours = dateN.getHours().toString().padStart(2, '0');
    // const minutes = dateN.getMinutes().toString().padStart(2, '0');
    // const seconds = dateN.getSeconds().toString().padStart(2, '0');
    // const formattedTime = `${hours}:${minutes}:${seconds}`;

    const formattedTime = this.convertTo24HourFormat(date);
    return `${formattedTime}:00`;
  }
// handleTime(date:any){
//   const dateN = new Date(date);

//   const hours = dateN.getHours().toString().padStart(2, '0');
//   const minutes = dateN.getMinutes().toString().padStart(2, '0');
//   const seconds = dateN.getSeconds().toString().padStart(2, '0');

//   const formattedTime = `${hours}:${minutes}:${seconds}`;
//   return formattedTime
// }
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
    if (this.isSubset(
      {...this.vacationHome, isAddMinReservation :this.form.value.isAddMinReservation}, this.form.value)) {
      this.emitNext.emit('9');
    }else{
    this.getCurrentSaveAction(true).subscribe(x => {
      this.toaster.success(

        this.localizationService.instant('::Host:VacationHome:successSave', 'Success')
      )
      if(this.id){
        this.emitNext.emit('9')
      }else{

        this.router.navigate(['/holiday-homes/add-edit-holiday-home',x.id])
      }
    });
  }
  }
  goBack(){
    this.emitNext.emit('7')
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
      let accessTime = this.handleTime(this.form.value.accessTime)
      let leaveTime = this.handleTime(this.form.value.leaveTime)

      //debugger
      const val = {
        bookingTypeId:0,
        vacationHomeReservationWay:this.form.value.vacationHomeReservationWay,
        accessTime:accessTime,
        leaveTime:leaveTime,
        minimumHomeReservationAmount:this.form.value.minimumHomeReservationAmount,
        id: this.id
      };
     return this.holidayHomeService.saveStep9ByInput(val);

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
