import { Component, Input } from '@angular/core';
import { GetVacationHomeCheckOutResponseDto, GetVacationHomeDetailsForGuestResponseDto } from '@proxy/vacation-homes';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
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
  paymentData = JSON.parse(localStorage.getItem('payment'));
}
