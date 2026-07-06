import { Component, Input } from '@angular/core';
import { GetExperienceDetailsForGuestResponseDto } from '@proxy/experiences';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-trip-info-details',
  standalone: true,
  imports: [UiComponentsModule],
  templateUrl: './trip-info-details.component.html',
  styleUrl: './trip-info-details.component.scss',
})
export class TripInfoDetailsComponent {
  @Input() experience: GetExperienceDetailsForGuestResponseDto = null;

}
