import { Component } from '@angular/core';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-trip-information',
  standalone: true,
  imports: [UiComponentsModule],
  templateUrl: './trip-information.component.html',
  styleUrl: './trip-information.component.scss',
})
export class TripInformationComponent {}
