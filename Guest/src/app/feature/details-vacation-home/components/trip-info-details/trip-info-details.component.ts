import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GetVacationHomeDetailsForGuestResponseDto } from '@proxy/vacation-homes';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-trip-info-details',
  standalone: true,
  imports: [UiComponentsModule, CommonModule],
  templateUrl: './trip-info-details.component.html',
  styleUrl: './trip-info-details.component.scss',
})
export class TripInfoDetailsComponent {
  @Input() vacationHome: GetVacationHomeDetailsForGuestResponseDto = null;
 
}
