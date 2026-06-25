import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GetVacationHomeDetailsForGuestResponseDto } from '@proxy/vacation-homes';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-trip-features',
  standalone: true,
  imports: [UiComponentsModule, CommonModule],
  templateUrl: './trip-features.component.html',
  styleUrl: './trip-features.component.scss',
})
export class TripFeaturesComponent {
  @Input() vacationHome: GetVacationHomeDetailsForGuestResponseDto = null;
}
