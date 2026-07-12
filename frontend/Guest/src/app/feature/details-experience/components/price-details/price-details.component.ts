import { AuthService, LocalizationService, SessionStateService } from '@abp/ng.core';
import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component,  Input,  OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ExperienceDatesType, ExperienceGuestService, GeDetailsReservationPricingForGuestDto, GetExperienceAvailabilityTimeSlotDto, GetExperienceDetailsForGuestResponseDto } from '@proxy/experiences';

import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { SpecificTimeSlotDto } from '@proxy/schedule-time-slots';
import { TimeFormatPipe } from 'src/shared/pipes/time-format.pipe';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { CarouselModalContentComponent } from '../carousel-modal/carousel-modal.component';
import { CreateExperiencePaymentDto } from '@proxy/payments';
import { ProfileService } from '@proxy/profiles';
import { SpecificVerificationTypeComponent } from 'src/app/feature/profile/specific-verification-type/specific-verification-type.component';

@Component({
  selector: 'app-price-details',
  standalone: true,
  imports: [UiComponentsModule, RouterModule,NzModalModule,TimeFormatPipe,CommonModule, SpecificVerificationTypeComponent],
  templateUrl: './price-details.component.html',
  styleUrl: './price-details.component.scss',
})
export class PriceDetailsComponent implements OnInit{
  @Input() experience: GetExperienceDetailsForGuestResponseDto = null;
  dateFrom: string;
  dateTo: string;
  id:any
  lang = this.sessionState.getLanguage();
  experienceDatesTypeEnum=ExperienceDatesType;
  showTimeSlot:boolean=false
  showDateTime:boolean = false
  payment= signal<GetExperienceAvailabilityTimeSlotDto>(null);
  TimeSlotChoosen = signal<SpecificTimeSlotDto>(null)
  seatsNo:number = 1
  pricingDetails:GeDetailsReservationPricingForGuestDto
  Details:GetExperienceAvailabilityTimeSlotDto
  specificTimeSlots:SpecificTimeSlotDto[]
  availableSeats:number 
  reservedDates:string[]
  selectedDate:string
  experienceDatesType:number = this.experienceDatesTypeEnum.Specific
  isLogin: boolean = this.authService.isAuthenticated;
  isAccountVerification: boolean = true;
  isVisibleLogin: boolean = false;
  isVisibleVerfied: boolean = false;
  paymentMethod: string | null = null;
   constructor(
      private service: ExperienceGuestService,
      private route: ActivatedRoute,
      private router: Router,
      private datepipe:DatePipe,
      private sessionState:SessionStateService,
      private modalservice:NzModalService,
      private localizationService:LocalizationService,
      private authService: AuthService,
      private profileService: ProfileService,

    ) {
      this.id = this.route.snapshot.params['id']
      const _dateFrom = this.route.snapshot.params['dateFrom'];
      const _dateTo = this.route.snapshot.params['dateTo'];
       this.dateFrom = _dateFrom ;
        this.dateTo = _dateTo ;
    }
    availableSchedualeDates:string[]
  
    ngOnInit(): void {
        if (this.isLogin) {
          this.getDataVerification();
        }
        this.getPayments();
       setTimeout(() => {
        this.experienceDatesType = this.experience?.experience.experienceDatesType
        console.log(this.experienceDatesType)
         if(this.experienceDatesType === this.experienceDatesTypeEnum.Scheduled){
           this.service.getAvailiableDatesByExperienceId(this.id).subscribe({
             next:next=>{
               this.availableSchedualeDates = next
             }
           })
         }else{
           this.getReservedDates()
         }
       }, 4000);

    }
    setDateFrom(val) {
      if(val){

        this.dateFrom = this.datepipe.transform(val, 'yyyy-MM-dd');
        this.TimeSlotChoosen.set(null);
        this.seatsNo = 1
        this.getTimeSlotAccordingToDate(this.dateFrom);
      }else{
        this.TimeSlotChoosen.set(null);
        this.specificTimeSlots = []
      }
      // this.getPayments()
    }
    getReservedDates(){
      this.service.getReservedDatesByExperienceId(this.id).subscribe({
        next:next=>{
          this.reservedDates = next
        }
      })
    }
    
    getPayments() {
      this.payment.set(null);
             //availability date
        this.service.getExperienceAvailabilityDateByFromDateAndToDateAndExperienceId(this.dateFrom, this.dateTo,this.id)
          .subscribe(data => {
            this.payment.set(data);
            this.dateFrom = data.date
            this.selectedDate = this.datepipe.transform(data.date, 'yyyy-MM-dd')
            this.pricingDetails = data.detailsReservation
            this.specificTimeSlots = this.payment().specificTimeSlots
            
        });
      
    }
    getChoosenTime(timeSlot:SpecificTimeSlotDto){
      this.TimeSlotChoosen.set(timeSlot)
      if(this.TimeSlotChoosen()){
        this.showTimeSlot = false
        this.availableSeats=this.TimeSlotChoosen().availableSeats
      if(this.seatsNo > this.availableSeats){
        this.seatsNo =  this.availableSeats
        this.getPricingDetails();

      }
      }
    }
 
    setSeats(e:number){
      if (e >= 0 && e <= this.TimeSlotChoosen().availableSeats){
        this.seatsNo = e;
        this.getPricingDetails();
      }
    }
    getPricingDetails(){
      this.service.getDetailsReservationPricingForGuestByExperienceIdAndNumberOfPerson(this.id,this.seatsNo ).subscribe({
        next:next=>{
          this.pricingDetails = next
        }
      })
    }
    getTimeSlotAccordingToDate(date:string){
      //avaiable time
      this.service.getExperienceAvailabilityTimeByDateAndExperienceId(date,this.id).subscribe({
        next:next=>{
          this.Details = next
          this.specificTimeSlots = this.Details.specificTimeSlots
        }
      })
    }
    getDataVerification() {
      this.profileService.getGuestProfile().subscribe(data => {
        this.isAccountVerification = true;
      });
    }

    pay(method?: string) {
      if (!this.isLogin) {
        localStorage.setItem('reserveUrl', window.location.href);
        this.isVisibleLogin = true;
      } else if (!this.isAccountVerification) {
        this.isVisibleVerfied = true;
      } else {
        this.payExperience();
      }
    }

    payExperience() {
      let obj: CreateExperiencePaymentDto = {
        experienceId: this.id,
        date: this.dateFrom,
        numberOfPeople: this.pricingDetails.numberOfPerson,
        checkInTime: this.TimeSlotChoosen().checkInTime,
        checkOutTime: this.TimeSlotChoosen().checkOutTime,
      };

      this.service.paymentByInput(obj).subscribe(x => {
        const isEnglish = this.lang === 'en';
        this.modalservice.warning({
          nzTitle: isEnglish ? 'Request Pending Approval' : 'طلبك قيد المراجعة',
          nzContent: isEnglish
            ? 'Your booking request has been submitted and is now pending approval. We will notify you once it has been reviewed.'
            : 'تم إرسال طلب الحجز الخاص بك وهو الآن قيد الموافقة، سنقوم بإعلامك فور الرد عليه.',
          nzOkText: isEnglish ? 'OK' : 'حسنًا',
          nzCentered: true,
          nzOnOk: () => this.router.navigate(['/reservation']),
        });
      });
    }

    goToAuth() {
      this.authService.navigateToLogin();
    }

    handleverfySuccess(value: boolean) {
      if (value) {
        this.isVisibleVerfied = false;
        this.getDataVerification();
        this.pay(this.paymentMethod ?? undefined);
      }
    }


  // Normalize a date to midnight UTC and convert to 'YYYY-MM-DD'
  normalizeDateToUTC(date: Date): string {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return utcDate.toISOString().split('T')[0];
  }
  
    // Check if a date is in the disabled dates array
    isDateDisabled(date: Date): boolean {
      const formattedDate = this.normalizeDateToUTC(date);
      return !!this.reservedDates?.includes(formattedDate);
    }
 disabledDate = (current: Date): boolean => {
      const todayDate = new Date(this.normalizeDateToUTC(new Date())); // Normalize today's date
    
      // Get the first day of the month, 6 months before today
      const sixMonthsBefore = new Date(todayDate.getFullYear(), todayDate.getMonth() - 5, 1);
    
      // Get the last day of the month, 6 months after today
      const sixMonthsAfter = new Date(todayDate.getFullYear(), todayDate.getMonth() + 6 + 1, 0);
    
      const currentDate = new Date(this.normalizeDateToUTC(current)); // Normalize selected date
    
      return currentDate < sixMonthsBefore || currentDate > sixMonthsAfter || this.isDateDisabled(current) || current < todayDate;
    };
    chooseDateForScheduled(){
      // this.showDateTime = true
      this.modalservice.create({
        nzTitle: this.localizationService.instant('::Guest:Explore:price:ExperienceDate'),
        nzContent: CarouselModalContentComponent,
        nzData:{data:this.availableSchedualeDates,
          selectedDate : this.selectedDate
        },
        nzFooter: null 
        }).afterClose.subscribe(selectedDate => {
          if (selectedDate) {
            this.selectedDate = selectedDate;
            this.setDateFrom(this.selectedDate)
          }
        });  
    }
    chooseTimeForScheduled(){
      // this.showDateTime = true
      this.modalservice.create({
        nzTitle: this.localizationService.instant('::Guest:Explore:price:ExperienceTime'),
        nzContent: CarouselModalContentComponent,
        nzData:{time:this.specificTimeSlots},
        nzFooter: null 
        }).afterClose.subscribe(selectedTime => {
          if (selectedTime) {
            this.getChoosenTime(selectedTime);
          }
        });  
    }
    
  }
