import { Component, Input } from '@angular/core';
import { GetExperienceDetailsForGuestResponseDto } from '@proxy/experiences';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-package-location',
  standalone: true,
  imports: [UiComponentsModule],
  templateUrl: './package-location.component.html',
  styleUrl: './package-location.component.scss',
})
export class PackageLocationComponent {
  @Input() experience: GetExperienceDetailsForGuestResponseDto = null;
  ngOnInit() {}
}
