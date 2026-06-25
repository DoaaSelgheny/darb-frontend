import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'app-booking-conditions',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './booking-conditions.component.html',
  styleUrl: './booking-conditions.component.scss',
})
export class BookingConditionsComponent {}
