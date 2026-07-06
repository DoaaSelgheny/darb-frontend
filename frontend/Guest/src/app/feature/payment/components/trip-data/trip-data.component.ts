import { Component, Input } from '@angular/core';
import { VacationHomeWithNavigationPropertiesDto } from '@proxy/vacation-homes';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-trip-data',
  standalone: true,
  imports: [UiComponentsModule],
  templateUrl: './trip-data.component.html',
  styleUrl: './trip-data.component.scss',
})
export class TripDataComponent {
  @Input() vacationHome: VacationHomeWithNavigationPropertiesDto;
}
