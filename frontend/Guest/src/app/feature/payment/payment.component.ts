import { Component, OnInit } from '@angular/core';
import { ReservationSummaryComponent } from './components/reservation-summary/reservation-summary.component';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import {
  GetVacationHomeCheckOutResponseDto,
  GetVacationHomeDetailsForGuestResponseDto,
  VacationHomeGuestService,
} from '@proxy/vacation-homes';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CoreModule, SessionStateService } from '@abp/ng.core';
import {
  ExperienceGuestService,
  GeDetailsReservationPricingForGuestDto,
  GetExperienceDetailsForGuestResponseDto,
} from '@proxy/experiences';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [UiComponentsModule, ReservationSummaryComponent, CoreModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  constructor(
    private service: VacationHomeGuestService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private experienceGuestService: ExperienceGuestService,
    private sessionState: SessionStateService,
  ) {
    this.id = +this.route.snapshot.params['id'];
    this.dateFrom = this.route.snapshot.params['dateFrom'];
    this.dateTo = this.route.snapshot.params['dateTo'];
    this.type = this.route.snapshot.params['type'];
  }
  lang = this.sessionState.getLanguage();
  id: number;
  dateFrom: string;
  dateTo: string;
  paymentUrl: SafeResourceUrl;
  type: string;
  payment: GetVacationHomeCheckOutResponseDto = null;
  vacationHome: GetVacationHomeDetailsForGuestResponseDto;
  paymentData;
  pricingDetails: GeDetailsReservationPricingForGuestDto;
  experience: GetExperienceDetailsForGuestResponseDto = null;

  ngOnInit(): void {
    const externalPaymentUrl = this.route.snapshot.queryParams['paymentUrl'];
    if (externalPaymentUrl) {
      this.paymentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(externalPaymentUrl);
    }

    if (this.type === 'experience') {
      this.paymentData = JSON.parse(localStorage.getItem('payment'));
      this.experienceGuestService.getDetails(this.id).subscribe(data => {
        this.experience = data;
      });
      if (this.paymentData?.seatsNo) {
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
      }
    } else {
      this.getPayments();
      this.service.getDetails(this.id).subscribe(data => {
        this.vacationHome = data;
      });
    }
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
}
