import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { TimeFormatPipe } from 'src/shared/pipes/time-format.pipe';

@Component({
  selector: 'app-reservation-summary',
  standalone: true,
  imports: [SharedModule,TimeFormatPipe],
  templateUrl: './reservation-summary.component.html',
  styleUrl: './reservation-summary.component.scss',
})
export class ReservationSummaryComponent {
  @Input() data: any;
  @Input() isVaction=false;
}
