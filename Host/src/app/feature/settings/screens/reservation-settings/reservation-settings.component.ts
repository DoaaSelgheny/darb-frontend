import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CheckInOutTimeComponent } from '../../components/check-in-out-time/check-in-out-time.component';
import { CancellationPolicyComponent } from '../../components/cancellation-policy/cancellation-policy.component';
import { BookingConditionsComponent } from '../../components/booking-conditions/booking-conditions.component';
import { AccessInstructionsComponent } from '../../components/access-instructions/access-instructions.component';

@Component({
  selector: 'app-reservation-settings',
  standalone: true,
  imports: [
    SharedModule,
    CheckInOutTimeComponent,
    CancellationPolicyComponent,
    BookingConditionsComponent,
    AccessInstructionsComponent,
  ],
  templateUrl: './reservation-settings.component.html',
  styleUrl: './reservation-settings.component.scss',
})
export class ReservationSettingsComponent {}
