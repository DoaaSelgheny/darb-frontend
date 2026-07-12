import { AuthService, SessionStateService } from '@abp/ng.core';
import { DatePipe } from '@angular/common';
import {  Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  GetVacationHomeCheckOutResponseDto,
  VacationHomeGuestService,
} from '@proxy/vacation-homes';
import { TimeFormatPipe } from 'src/shared/pipes/time-format.pipe';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProfileService } from '@proxy/profiles';
import { SpecificVerificationTypeComponent } from 'src/app/feature/profile/specific-verification-type/specific-verification-type.component';

@Component({
  selector: 'app-price-details',
  standalone: true,
  imports: [UiComponentsModule, TimeFormatPipe, SpecificVerificationTypeComponent],
  templateUrl: './price-details.component.html',
  styleUrl: './price-details.component.scss',
})
export class PriceDetailsComponent implements OnInit {
  dateFrom:string;
  dateTo:string;
  id:any
  lang = this.sessionState.getLanguage();
  Today = new Date()
 tomorrow = new Date(this.Today); // Create a new Date object based on today
  dateToday:string;
  dateTommorow:string;
  vacatioHomeDate?: Date[] = null;
  reservedDates:string[]
  payment: GetVacationHomeCheckOutResponseDto = null;
  dateModel: Date[] = [];
  isLogin: boolean = this.authService.isAuthenticated;
  isAccountVerification: boolean = true;
  isVisibleLogin: boolean = false;
  isVisibleVerfied: boolean = false;
  paymentMethod: string | null = null;
  constructor(
    private service: VacationHomeGuestService,
    private route: ActivatedRoute,
    private router: Router,
    private datepipe:DatePipe,
    private sessionState:SessionStateService,
    private authService: AuthService,
    private profileService: ProfileService,
    private modalservice: NzModalService,
  ) {
    this.tomorrow.setDate(this.Today.getDate() + 1); 
    this.id = this.route.snapshot.params['id']
    const _dateFrom = this.route.snapshot.params['dateFrom'];
    const _dateTo = this.route.snapshot.params['dateTo'];
     this.dateFrom = _dateFrom ?? this.datepipe.transform(this.Today, 'yyyy-MM-dd');
      this.dateTo = _dateTo ?? this.datepipe.transform(this.tomorrow, 'yyyy-MM-dd');
      if (_dateFrom){ 
      
        let dateFrom = new Date(_dateFrom);
        
        this.dateModel.push(dateFrom)
      }else{
        let dateFrom =  this.Today;
        
        this.dateModel.push(dateFrom)
      }
        
      if (_dateTo) {
        let dateTo =new Date(_dateTo);
        this.dateModel.push(dateTo)
      }else{
        let dateTo =this.tomorrow;
        this.dateModel.push(dateTo)
      }
  }
 
  ngOnInit(): void {
    if (this.isLogin) {
      this.getDataVerification();
    }

    setTimeout(() => {
      this.getPayments();
      this.getReservedDates()
    }, 1000);
  }
  getDataVerification() {
    this.profileService.getGuestProfile().subscribe(data => {
      this.isAccountVerification = true;
    });
  }
  getReservedDates(){
    this.service.getReservedDatesByVacationHomeId(this.id).subscribe({
      next:next=>{
        this.reservedDates = next
      }
    })
  }
  changeVacationHomeDate(event) {
    if(event.length){
      this.vacatioHomeDate = event;
      this.dateFrom = this.datepipe.transform(this.vacatioHomeDate[0], 'yyyy-MM-dd');
      this.dateTo = this.datepipe.transform(this.vacatioHomeDate[1], 'yyyy-MM-dd');
      this.getPayments()
    }else{
      this.vacatioHomeDate = null
      this.dateFrom =null;
      this.dateTo =null;
    }
  }
  getPayments() {
    this.payment = null;
      let input ={
        dateFrom:  this.dateFrom,
        dateTo: this.dateTo,
      }      
      this.service.getVacationHomeCheckOut(this.id,input)
        .subscribe(data => {
          this.payment = data;
      });
    
    
  }

  pay(method?: string) {
    if (!this.isLogin) {
      localStorage.setItem('reserveUrl', window.location.href);
      this.isVisibleLogin = true;
    } else if (!this.isAccountVerification) {
      this.isVisibleVerfied = true;
    } else {
      this.payHomeHoliday();
    }
  }

  payHomeHoliday() {
    this.service
      .paymentByInput({
        vacationHomeId: this.id,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
      })
      .subscribe(x => {
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
      return this.reservedDates.includes(formattedDate);
    }
  
    // Disable date logic
    // disabledDate = (current: Date): boolean => {
    //   const todayDate = this.normalizeDateToUTC(new Date());
    //   const currentDate = this.normalizeDateToUTC(current);
    //   return (
    //     currentDate < todayDate || this.isDateDisabled(current)
    //   );
    // };
    disabledDate = (current: Date): boolean => {
      const todayDate = new Date(this.normalizeDateToUTC(new Date())); // Normalize today's date
    
      // Get the first day of the month, 6 months before today
      const sixMonthsBefore = new Date(todayDate.getFullYear(), todayDate.getMonth() - 5, 1);
    
      // Get the last day of the month, 6 months after today
      const sixMonthsAfter = new Date(todayDate.getFullYear(), todayDate.getMonth() + 6 + 1, 0);
    
      const currentDate = new Date(this.normalizeDateToUTC(current)); // Normalize selected date
    
      return currentDate < sixMonthsBefore || currentDate > sixMonthsAfter || this.isDateDisabled(current) || current < todayDate;
    };
    
    
}
