import { Component, OnInit } from '@angular/core';
import { ReservationSummaryComponent } from './components/reservation-summary/reservation-summary.component';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import { TripDataComponent } from './components/trip-data/trip-data.component';
import {
  GetVacationHomeCheckOutResponseDto,
  GetVacationHomeDetailsForGuestResponseDto,
  VacationHomeGuestService,
} from '@proxy/vacation-homes';
import { CreateExperiencePaymentDto, PaymentMethods } from '@proxy/payments';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToasterService } from '@abp/ng.theme.shared';
import { AuthService, ConfigStateService, CoreModule, SessionStateService } from '@abp/ng.core';
import {
  ExperienceGuestService,
  GeDetailsReservationPricingForGuestDto,
  GetExperienceDetailsForGuestResponseDto,
} from '@proxy/experiences';
import { ProfileService } from '@proxy/profiles';
import { AccountVerificationStatus } from '@proxy/account-verifications/enum';
import { ConfrontationTypes } from 'src/shared/ui-components/confrontation-popup/confrontation-types.enum';
import { SpecificVerificationTypeComponent } from '../profile/specific-verification-type/specific-verification-type.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [UiComponentsModule, ReservationSummaryComponent,
    SpecificVerificationTypeComponent,
    TripDataComponent, CoreModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  isVisibleVerfied=false;
  constructor(
    private service: VacationHomeGuestService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService,
    private experienceGuestService: ExperienceGuestService,
    private sessionState: SessionStateService,
    private toasterService: ToasterService,
  ) {
    this.id = +this.route.snapshot.params['id'];
    this.dateFrom = this.route.snapshot.params['dateFrom'];
    this.dateTo = this.route.snapshot.params['dateTo'];
    this.type = this.route.snapshot.params['type'];
  }
  lang = this.sessionState.getLanguage();
  isLogin: boolean = this.authService.isAuthenticated;
  isShowPayment = false;
  isShowPayment2 = false;
  PaymentMethods = PaymentMethods
  id: number;
  dateFrom: string;
  isAccountVerification: boolean;
  status = AccountVerificationStatus;
  dateTo: string;
  paymentUrl: SafeResourceUrl;
  type: string; //
  paymentMethod: string = null;
  payment: GetVacationHomeCheckOutResponseDto = null;
  vacationHome: GetVacationHomeDetailsForGuestResponseDto;
  paymentData;
  pricingDetails: GeDetailsReservationPricingForGuestDto;
  experience: GetExperienceDetailsForGuestResponseDto = null;
  isVisibleLogin: boolean = false;

  isVisibleCongratulationReservation: boolean = false;
  confrontationTypesEnum = ConfrontationTypes;
  ngOnInit(): void {
    if (this.isLogin) {
      this.getDataVerification();
    }

    if (localStorage.getItem('reserveUrl')) {
      localStorage.removeItem('reserveUrl');
    }

    if (this.type === 'experience') {
      this.paymentData = JSON.parse(localStorage.getItem('payment'));
      this.experienceGuestService.getDetails(this.id).subscribe(data => {
        this.experience = data;
      });
      this.experienceGuestService
        .getDetailsReservationPricingForGuestByExperienceIdAndNumberOfPerson(
          this.id,
          this.paymentData.seatsNo,
        )
        .subscribe({
          next: next => {
            this.pricingDetails = next;
          },
        });
    } else {
      this.getPayments();
      this.service.getDetails(this.id).subscribe(data => {
        this.vacationHome = data;
      });
    }
  }
  getDataVerification() {
    this.profileService.getGuestProfile().subscribe(data => {
      // if (data?.isVerifiedBy3rdParty ) {
      //   this.isAccountVerification = true;
      // }
    });
  }
  getPayments() {
    this.payment = null;
    this.service
      .getVacationHomeCheckOut(this.id, {
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
      })
      .subscribe(data => {
        this.payment = data;
      });
  }
  payHomeHoliday() {
    this.service
      .paymentByInput({
        // cartAmount: this.payment.payNow,
        returnUrl: environment.application.baseUrl + '/success',
        vacationHomeId: this.id,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        paymentMethod: this.paymentMethod,
        method: this.paymentMethod === 'Credit' ? {method:PaymentMethods.Credit} : {method:PaymentMethods.Settlement},
        applyPayToken: null,
        isHandledByFront: true,
      })
      .subscribe(x => {
        this.paymentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(x.paymentUrl)
        if(this.paymentMethod === 'Credit') {
          this.isShowPayment = true;this.isShowPayment2 = false;
        }else{
          this.isShowPayment2 = true;this.isShowPayment = false;
        }
       
        console.log(this.paymentMethod,this.isShowPayment,this.isShowPayment2) 

        // wait until component has rendered
        setTimeout(() => {
      
          document.getElementById('creditPayment').scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        }, 350);
      });
  }
  payExperience() {
    let obj: CreateExperiencePaymentDto = {
      // cartAmount: this.pricingDetails.totalPrice,
      returnUrl: environment.application.baseUrl + '/success',
      experienceId: this.id,
      date: this.paymentData.date,
      numberOfPeople: this.pricingDetails.numberOfPerson,
      checkInTime: this.paymentData.checkInTime,
      checkOutTime: this.paymentData.checkOutTime,
      paymentMethod: this.paymentMethod,
      method: this.paymentMethod === 'Credit' ? {method:PaymentMethods.Credit} : {method:PaymentMethods.Settlement},
      applyPayToken: null,
      isHandledByFront: true,
    };

    this.experienceGuestService.paymentByInput(obj).subscribe(x => {
      this.paymentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(x.paymentUrl);
      if(this.paymentMethod === 'Credit') {
        this.isShowPayment = true;this.isShowPayment2 = false;
      }else{
        this.isShowPayment2 = true;this.isShowPayment = false;
      }
      // wait until component has rendered
      setTimeout(() => {
      //  this.isVisibleCongratulationReservation=true
        document.getElementById('creditPayment').scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }, 350);
    });
  }
  goToAuth() {
    this.authService.navigateToLogin();
  }
  pay(method:string) {
    debugger
    this.paymentMethod = method;
    if (!this.isLogin) {
      localStorage.setItem('reserveUrl', window.location.href);
      this.isVisibleLogin = true;
    } else if (!this.isAccountVerification) {
      this.isVisibleVerfied = true;
    } else {
      if (this.type === 'vacation-home') {
        this.payHomeHoliday();
      } else {
        this.payExperience();
      }
    }
    // if type home holiday
  }

  handleverfySuccess(value)
  {
    if(value)
    {
      this.isVisibleVerfied=false;
      this.getDataVerification();
      this.pay(this.paymentMethod)
    }
  }
}
