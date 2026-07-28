import { Component, OnInit } from '@angular/core';
import { ReservationSummaryComponent } from './components/reservation-summary/reservation-summary.component';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import {
  GetVacationHomeCheckOutResponseDto,
  GetVacationHomeDetailsForGuestResponseDto,
  VacationHomeGuestService,
} from '@proxy/vacation-homes';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CoreModule, LocalizationService, SessionStateService } from '@abp/ng.core';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  ExperienceGuestService,
  GeDetailsReservationPricingForGuestDto,
  GetExperienceDetailsForGuestResponseDto,
} from '@proxy/experiences';
import { PaymentType } from '@proxy/reservation-users';
import { PaymentOptionDto, StartPaymentResultDto } from '@proxy/payments';
import { PaymentsService } from '@proxy/means';
import { ReservationWorkflowService } from '@proxy/reservations';
import { AccountVerificationService } from '@proxy/account-verifications';

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
    private router: Router,
    private sanitizer: DomSanitizer,
    private experienceGuestService: ExperienceGuestService,
    private sessionState: SessionStateService,
    private paymentsService: PaymentsService,
    private reservationWorkflowService: ReservationWorkflowService,
    private accountVerificationService: AccountVerificationService,
    private modalService: NzModalService,
    private localizationService: LocalizationService,
  ) {
    this.id = +this.route.snapshot.params['id'];
    this.dateFrom = this.route.snapshot.params['dateFrom'];
    this.dateTo = this.route.snapshot.params['dateTo'];
    this.type = this.route.snapshot.params['type'];
    this.reservationId = +this.route.snapshot.params['reservationId'];
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

  reservationId: number;
  PaymentType = PaymentType;
  paymentOptions: PaymentOptionDto[] = [];
  optionsLoading = false;
  selectedPaymentType: PaymentType | null = null;
  starting = false;
  startResult: StartPaymentResultDto = null;
  receiptFile: File | null = null;
  uploading = false;
  receiptSubmitted = false;

  ngOnInit(): void {
    if (this.reservationId) {
      this.loadPaymentOptions();
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

  loadPaymentOptions() {
    this.optionsLoading = true;
    this.paymentsService.getPaymentOptions().subscribe({
      next: options => {
        this.paymentOptions = options;
        this.optionsLoading = false;
      },
      error: () => {
        this.optionsLoading = false;
      },
    });
  }

  selectPaymentType(type: PaymentType) {
    this.selectedPaymentType = type;
    this.startResult = null;
    this.paymentUrl = null;
    this.receiptFile = null;
    this.receiptSubmitted = false;
    this.startPayment();
  }

  startPayment() {
    if (this.selectedPaymentType == null) {
      return;
    }
    this.starting = true;
    this.reservationWorkflowService
      .startPayment({ reservationId: this.reservationId, paymentType: this.selectedPaymentType })
      .subscribe({
        next: result => {
          this.startResult = result;
          this.starting = false;
          if (result.paymentUrl) {
            this.paymentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(result.paymentUrl);
          }
        },
        error: () => {
          this.starting = false;
        },
      });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.receiptFile = input.files?.[0] ?? null;
    if (this.receiptFile) {
      this.submitReceipt();
    }
  }

  submitReceipt() {
    if (!this.receiptFile || !this.reservationId) {
      return;
    }
    this.uploading = true;
    const formData = new FormData();
    formData.append('file', this.receiptFile);
    this.accountVerificationService.upload(formData).subscribe({
      next: blob => {
        this.reservationWorkflowService
          .uploadPaymentReceipt({ reservationId: this.reservationId, paymentReceiptFileName: blob.name })
          .subscribe({
            next: result => {
              this.startResult = result;
              this.receiptSubmitted = true;
              this.uploading = false;
              this.showReceiptSubmittedModal();
            },
            error: () => {
              this.uploading = false;
            },
          });
      },
      error: () => {
        this.uploading = false;
      },
    });
  }

  showReceiptSubmittedModal() {
    this.modalService.success({
      nzTitle: this.localizationService.instant('::guest:payment:receiptSubmittedTitle'),
      nzContent: this.localizationService.instant('::guest:payment:receiptSubmittedMessage'),
      nzOkText: this.localizationService.instant('::ok'),
      nzCentered: true,
      nzOnOk: () => this.router.navigate(['/reservation']),
    });
  }
}
