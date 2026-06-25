import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimaryPaymentDto } from '@proxy/payments';
import { GetVacationHomeCheckOutResponseDto, GetVacationHomeDetailsForGuestResponseDto, VacationHomeGuestService, VacationHomeWithNavigationPropertiesDto } from '@proxy/vacation-homes';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { GeDetailsReservationPricingForGuestDto, GetExperienceDetailsForGuestResponseDto } from '@proxy/experiences';
import { TimeFormatPipe } from 'src/shared/pipes/time-format.pipe';
@Component({
  selector: 'app-reservation-summary',
  standalone: true,
  imports: [UiComponentsModule,TimeFormatPipe],
  templateUrl: './reservation-summary.component.html',
  styleUrl: './reservation-summary.component.scss',
})
export class ReservationSummaryComponent {

  
  @Input() vacationHome: GetVacationHomeDetailsForGuestResponseDto;
  @Input() payment: GetVacationHomeCheckOutResponseDto = null;
  @Input() dateFrom: string;
  @Input() dateTo: string;
  @Input() pricingDetails:GeDetailsReservationPricingForGuestDto= null;
  @Input() type:string=''
  @Input() experience: GetExperienceDetailsForGuestResponseDto = null;
   @Output() pay = new EventEmitter<string>();
   paymentData = JSON.parse(localStorage.getItem('payment'));
  constructor(private service: VacationHomeGuestService,private sanitizer: DomSanitizer,){
  }
  //  pay11() {

  //     this.service
  //       .paymentByInput({
  //         // cartAmount: 10,
  //         returnUrl: environment.application.baseUrl + '/success',
  //         vacationHomeId: 274,
  //         dateFrom: this.dateFrom,
  //         dateTo: this.dateTo,
  //       })
  //       .subscribe(x => {         
  //         // wait until component has rendered
  //         setTimeout(() => {
  //           document.getElementById('creditPayment').scrollIntoView({
  //             behavior: 'smooth',
  //             block: 'start',
  //             inline: 'nearest',
  //           });
  //         }, 350);
  //       });
  //     }
}
