import { Component, Input } from '@angular/core';
import { GetVacationHomeDetailsForGuestResponseDto } from '@proxy/vacation-homes';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-header-details-trip',
  standalone: true,
  imports: [UiComponentsModule],
  templateUrl: './header-details-trip.component.html',
  styleUrl: './header-details-trip.component.scss',
})
export class HeaderDetailsTripComponent {
  @Input() vacationHome: GetVacationHomeDetailsForGuestResponseDto = null;
}
