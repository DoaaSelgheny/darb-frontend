import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GetVacationHomeDetailsForGuestResponseDto } from '@proxy/vacation-homes';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
@Component({
  selector: 'app-package-location',
  standalone: true,
  imports: [UiComponentsModule, CommonModule],
  templateUrl: './package-location.component.html',
  styleUrl: './package-location.component.scss',
})
export class PackageLocationComponent {
  @Input() vacationHome: GetVacationHomeDetailsForGuestResponseDto = null;

}
