import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ExperienceDatesType,
  ExperienceHostService,
  ExperienceReservationWay,
  ReceptionTimeType,
} from '@proxy/experiences';

import { Subscription } from 'rxjs';
import { vaidationType } from 'src/shared/directives/vaidationTypeEnum';
import { TosterService } from 'src/shared/services/toster.service';
import { isArray, LocalizationService } from '@abp/ng.core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-experiment-booking-details',
  templateUrl: './experiment-booking-details.component.html',
  styleUrl: './experiment-booking-details.component.scss',
})
export class ExperimentBookingDetailsComponent {
  experienceReservationWayEnum = ExperienceReservationWay;
  openAccordionIndex: number | null = null;
  openAccordionIndexSechduale: number | null = null;
  min = new Date();
  form = new FormGroup({
    experienceReservationWay: new FormControl(
      this.experienceReservationWayEnum.Instant,
      Validators.required,
    ),
    specificTimeSlots: new FormControl(),
    experienceDatesType: new FormControl(null, Validators.required),
    receptionTimeType: new FormControl(null),
    experienceTimeSlots: this.fb.array([this.createSchedule()]), //
    experienceScheduleDates: this.fb.array([this.createexperienceScheduleDates()]),
  });
  subscriptions: Subscription = new Subscription();
  @Output() emitNext = new EventEmitter<string>();
  @Input() id: any;
  @Input() experience: any;
  isVisibleSaveAndExit: boolean = false;
  lang = this.localizationService.currentLang;
  vaidationTypeEnum = vaidationType;

  experienceDatesTypeEnum = ExperienceDatesType;
  receptionTimeTypeEnum = ReceptionTimeType;
  bookingTypes = [
    {
      id: this.experienceReservationWayEnum.Instant,
      nameEn: 'Instant Booking',
      nameAr: 'حجز فوري',
      nameZh: '即时预订',
    },
    // {
    //   id: this.experienceReservationWayEnum.ReservationRequiresApproval,
    //   nameEn: 'Approval',
    //   nameAr: 'حجز يتطلب موافقة',
    //   nameZh: '预订需要批准',
    // },
  ];

  constructor(
    private localizationService: LocalizationService,
    public service: ExperienceHostService,
    private router: Router,
    private toaster: TosterService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private datePipe: DatePipe,
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.experience) {
      this.setValueToFormGroup(this.form as FormGroup, this.experience);
      if (this.id) {
        this.service.getWithNavigationProperties(Number(this.id)).subscribe((data: any) => {
          this.experience = data.experience;
          this.setValueToFormGroup(this.form as FormGroup, this.experience);
          this.form.patchValue({
            experienceReservationWay: this.bookingTypes[0].id,
          });
          let experienceTimeSlots = [];
          this.experienceTimeSlots.clear();
          this.experience.specificTimeSlots.forEach(element => {
            experienceTimeSlots.push({
              id: element.id,
              timeSlotId: element.id,
              checkInTime: this.convertTo12HourFormat(element.checkInTime),
              checkOutTime: this.convertTo12HourFormat(element.checkOutTime),
              // checkInTime: this.convertTimeStringToDate(element.checkInTime),
              // checkOutTime: this.convertTimeStringToDate(element.checkOutTime),
              availableSeats: element.availableSeats,
            });
            this.addSchedule();
          });
          ///////
          if (this.experience.specificTimeSlots.length > 0) {
            this.experienceScheduleDates.clear();
          }
          if (
            this.experience.specificTimeSlots.length === 0 &&
            this.experience.scheduleDates.length === 0
          ) {
            this.experienceScheduleDates.clear();
          }
          const scheduleArray = this.form.get('experienceScheduleDates') as FormArray;

          this.experience.scheduleDates.forEach((element, index) => {
            const scheduleGroup = scheduleArray.at(index) as FormGroup;
            const timeSlotArray = scheduleGroup.get('scheduleTimeSlots') as FormArray;

 
            //this.addSchedule2()
            // this.addSession(index);

            element.scheduleTimeSlots.forEach(slot => {
              timeSlotArray.push(
                this.fb.group({
                  checkInTime: this.convertTo12HourFormat(slot.checkInTime),
                  checkOutTime: this.convertTo12HourFormat(slot.checkOutTime),
                  // checkInTime: this.convertTimeStringToDate(slot.checkInTime),
                  // checkOutTime: this.convertTimeStringToDate(slot.checkOutTime),
                  availableSeats: slot.availableSeats,
                }),
              );
            });
            scheduleGroup.patchValue({
              scheduleDateId: element.experienceId,
              date: element.date,
            });
            if (index + 1 < this.experience.scheduleDates.length) this.addSchedule2();
          });

          this.form.get('experienceScheduleDates').patchValue(scheduleArray.value);
          this.form.get('experienceTimeSlots').patchValue(experienceTimeSlots);
        });
      }
    }
  }
  ////
  get experienceTimeSlots(): FormArray {
    return this.form.get('experienceTimeSlots') as FormArray;
  }

  // Create a single schedule form group
  createSchedule(): FormGroup {
    return this.fb.group({
      id: [0],
      timeSlotId: [0],
      checkInTime: [, Validators.required],
      checkOutTime: [, Validators.required],
      availableSeats: [1, [Validators.required, Validators.min(1)]],
    });
  }

  // Add a new schedule to the form array
  addSchedule(): void {
    this.experienceTimeSlots.push(this.createSchedule());
  }

  // Check if a specific accordion item is open
  isOpen(index: number): boolean {
    return this.openAccordionIndex === index;
  }
  isOpenSechduale(index: number): boolean {
    return this.openAccordionIndexSechduale === index;
  }
  // Toggle the accordion item
  toggleAccordion(index: number): void {
    if (this.openAccordionIndex === index) {
      this.openAccordionIndex = null; // Close if open
    } else {
      this.openAccordionIndex = index; // Open the new index
    }
  }
  toggleAccordionSechduale(index: number): void {
    if (this.openAccordionIndexSechduale === index) {
      this.openAccordionIndexSechduale = null; // Close if open
    } else {
      this.openAccordionIndexSechduale = index; // Open the new index
    }
  }

  // Remove a schedule from the form array
  removeSchedule(index: number): void {
    this.experienceTimeSlots.removeAt(index);
  }

  // Increase seat count
  increaseSeats(index: number): void {
    const seats = this.experienceTimeSlots.at(index).get('availableSeats');
    seats?.setValue(seats.value + 1);
  }

  // Decrease seat count
  decreaseSeats(index: number): void {
    const seats = this.experienceTimeSlots.at(index).get('availableSeats');
    if (seats?.value > 1) {
      seats.setValue(seats.value - 1);
    }
  }
  //////////////////////////schudel
  get experienceScheduleDates(): FormArray {
    return this.form.get('experienceScheduleDates') as FormArray;
  }
  // Getter for sessions inside a specific day
  getSessions(dayIndex: number): FormArray {
    return this.experienceScheduleDates.at(dayIndex).get('scheduleTimeSlots') as FormArray;
  }
  createexperienceScheduleDates(): FormGroup {
    return this.fb.group({
      scheduleDateId: [0],
      date: [, Validators.required],
      scheduleTimeSlots: this.fb.array([]),
    });
  }
  // Add a new schedule to the form array
  addSchedule2(): void {
    this.experienceScheduleDates.push(this.createexperienceScheduleDates());
  }

  // Remove a schedule from the form array
  removeSchedule2(index: number): void {
    this.experienceScheduleDates.removeAt(index);
  }
  // Add a new session to a specific day
  addSession(dayIndex: number): void {
    const sessionGroup = this.fb.group({
      id: [],
      timeSlotId: [],
      checkInTime: [, Validators.required],
      checkOutTime: [, Validators.required],
      availableSeats: [1, [Validators.required, Validators.min(1)]],
    });
    this.getSessions(dayIndex).push(sessionGroup);
  }

  // Remove a session from a specific day
  removeSession(dayIndex: number, sessionIndex: number): void {
    this.getSessions(dayIndex).removeAt(sessionIndex);
  }

  // Increase seat count
  increaseSeats2(index: number): void {
    // const seats = this.experienceScheduleDates.at(index).get('scheduleTimeSlots').at(index);
    // seats?.setValue(seats.value + 1);
  }

  // Decrease seat count
  decreaseSeats2(index: number): void {
    // const seats = this.experienceScheduleDates.at(index).get('scheduleTimeSlots');
    // if (seats?.value > 1) {
    //   seats.setValue(seats.value - 1);
    // }
  }
  // Open a time picker for startTime or endTime (stub function for integration)
  openTimePicker(index: number, field: string): void {
    // Replace this with actual time picker integration logic
  }
  /////
  convertTimeStringToDate(timeString: string): Date {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0); // Set hours, minutes, seconds, and milliseconds
    return date;
  }

  isTypeSelected(type: any) {
    if (this.form.controls['experienceDatesType'].value == null) return false;
    return this.form.controls['experienceDatesType'].value == type;
  }
  selectType(type: any) {
    if (this.form.controls['experienceDatesType'].value == type) {
      this.form.controls['experienceDatesType'].setValue(null);
    } else this.form.controls['experienceDatesType'].setValue(type);
  }
  isTypeSelectedreceptionTimeType(type: any) {
    if (this.form.controls['receptionTimeType'].value == null) return false;
    return this.form.controls['receptionTimeType'].value == type;
  }
  selectTypereceptionTimeType(type: any) {
    if (this.form.controls['receptionTimeType'].value == type) {
      this.form.controls['receptionTimeType'].setValue(null);
    } else this.form.controls['receptionTimeType'].setValue(type);
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
  updateAllChecked(e) {
    if (e) {
      this.form.get('minimumHomeReservationAmount').setValidators(Validators.required);
      this.form.updateValueAndValidity();
    } else {
      this.form.get('minimumHomeReservationAmount').setValidators(null);
      this.form.updateValueAndValidity();
    }
  }

  validateCurrentPage(): boolean {
    let isValidDatesType = false;
    if (this.form.get('experienceDatesType').value === this.experienceDatesTypeEnum.Scheduled) {
      if (this.experienceScheduleDates.length > 0) {
        this.experienceScheduleDates.value.forEach(element => {
          if (element.scheduleTimeSlots.length > 0) {
            isValidDatesType = true;
          
          }
        });
      }
    }
    if (this.form.get('experienceDatesType').value === this.experienceDatesTypeEnum.Specific) {
      if (this.experienceTimeSlots.length > 0) {
        isValidDatesType = true;
      }
    }
  this.isInvalidTime()
    return this.form?.valid && isValidDatesType &&!this.isValidTime ;
  }
  updateData() {
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
    }
  }
  isValidTime=true;
  //new time
  isInvalidTime() {
    if (
      this.form.value.experienceDatesType === this.experienceDatesTypeEnum.Specific &&
      this.form.get('experienceTimeSlots').value.length > 0
    ) {
      this.form.get('experienceTimeSlots').value.forEach(element => {

        this.isValidTime= this.isTimeEarlier(
          this.convertTo24HourFormat(element.checkOutTime),
          this.convertTo24HourFormat(element.checkInTime),
        );
        if(!this.isValidTime)
        {
          return;
        }
      });
   
    } 
     if (
      this.form.value.experienceDatesType === this.experienceDatesTypeEnum.Scheduled &&
      this.form.get('experienceScheduleDates').value.length > 0
    ) {
      this.form.get('experienceScheduleDates').value.forEach(element => {
        element.scheduleTimeSlots.forEach(element2 => {
          console.log(element2)
          this.isValidTime= this.isTimeEarlier(
            this.convertTo24HourFormat(element2.checkOutTime),
            this.convertTo24HourFormat(element2.checkInTime),
          );
          if(!this.isValidTime)
            {
              return;
            }
        });
      });
    } 
   
    
  }
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
  checkObjectsEqual(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
  compareArraysUnordered(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }
    const hasObjects = arr1.some(
      item => typeof item === 'object' && !Array.isArray(item) && item !== null,
    );
    if (hasObjects) {
      for (let i = 0; i < arr1.length; i++) {
        if (!this.checkObjectsEqual(arr1[i], arr2[i])) {
          return false;
        }
      }
      return true;
    }
    return arr1.sort().toString() === arr2.sort().toString();
  }
  // isSubset(object1: any, object2: any): boolean {
  //   for (let key in object2) {
  //     // Check if object1 contains the key and the value is the same
  //     if (
  //       object2.hasOwnProperty(key) &&
  //       (Array.isArray(object1[key])
  //         ? !this.compareArraysUnordered(object1[key], object2[key])
  //         : object1[key] !== object2[key])
  //     ) {
  //       return false; // Return false if any key-value pair does not match
  //     }
  //   }

  //   return true; // All key-value pairs from object2 match in object1
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
      return object2.every(item2 => object1.some(item1 => this.isSubset(item1, item2)));
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
    this.form.get('specificTimeSlots').setValue(this.form.get('experienceTimeSlots').value);

    if (this.isSubset(this.experience, this.form.value)) {
      this.emitNext.emit('5');
    } else {
      this.submitFunction();
    }
  }
  submitFunction() {
    this.isVisibleSaveAndExit = false;
    this.getCurrentSaveAction(true).subscribe(x => {
      this.toaster.success(
        this.localizationService.instant('::Host:VacationHome:successSave', 'Success'),
      );
      if (this.id) {
        this.emitNext.emit('5');
      } else {
        this.router.navigate(['/experiments/experiment-add-edit/', this.id]);
      }
    });
  }
  goBack() {
    this.emitNext.emit('3');
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
    let index = 0;
    this.experienceTimeSlots.value.forEach(element => {
      element.timeSlotId = index + 1;
      element.checkInTime = this.handleTime(element.checkInTime);

      element.checkOutTime = this.handleTime(element.checkOutTime);
    });

    this.experienceScheduleDates.value.forEach(element => {
      element.scheduleTimeSlots.forEach(element2 => {
        element2.timeSlotId = index + 1;
        element2.checkInTime = this.handleTime(element2.checkInTime);

        element2.checkOutTime = this.handleTime(element2.checkOutTime);
      });
    });
    if (this.form.value.experienceDatesType === this.experienceDatesTypeEnum.Scheduled) {
      this.experienceTimeSlots.clear();
    }
    if (this.form.value.experienceDatesType === this.experienceDatesTypeEnum.Specific) {
      this.experienceScheduleDates.clear();
    }
    //  this.form.get('experienceScheduleDates').setValue(null)
    //debugger
    const val = {
      ...this.form.value,
      id: this.id,
    };
    return this.service.saveStep5ByInput(val as any);
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
  ngOnDestroy(): void {
    sessionStorage.removeItem('currentStep');
    localStorage.removeItem(this.id?.toString() ?? '');
  }
}
