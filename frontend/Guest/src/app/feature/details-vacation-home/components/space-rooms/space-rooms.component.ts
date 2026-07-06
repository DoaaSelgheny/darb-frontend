import { LocalizationService } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import {  Component, Input, OnInit } from '@angular/core';
import { AmenitiesType } from '@proxy/amenitiess/amenities-type.enum';
import { GetVacationHomeDetailsForGuestResponseDto } from '@proxy/vacation-homes';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-space-rooms',
  standalone: true,
  imports: [UiComponentsModule, CommonModule],
  templateUrl: './space-rooms.component.html',
  styleUrl: './space-rooms.component.scss',
})
export class SpaceRoomsComponent implements OnInit {
  constructor(private localizationService: LocalizationService) {}
  lang = this.localizationService.currentLang;
  @Input() vacationHome: GetVacationHomeDetailsForGuestResponseDto = null;
  AmenitiesTypeEnum = AmenitiesType;

  ngOnInit(): void {
  }
  getAbpLocalizedBestForTextName(): string {
    const bestForTypes: any[] = [
      { id: 0, name: 'SinglesAndMarried' },
      { id: 1, name: 'Married' },
      { id: 2, name: 'Singles' },
    ];

    const selectedType = bestForTypes.find(
      b => b.id == this.vacationHome?.vacationHome?.vacationHomeCategoryType,
    );

    return selectedType ? selectedType.name : '';
  }
}
