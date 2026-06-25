import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AttendanceType,  GetExperienceDetailsForGuestResponseDto, LanguageType } from '@proxy/experiences';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-space-rooms',
  standalone: true,
  imports: [UiComponentsModule, CommonModule],
  templateUrl: './space-rooms.component.html',
  styleUrl: './space-rooms.component.scss',
})
export class SpaceRoomsComponent {
  @Input() experience: GetExperienceDetailsForGuestResponseDto = null;
  attendanceTypeEnum= AttendanceType;
  languageTypeEnum= LanguageType;
 
}
