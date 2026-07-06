import { LocalizationService } from '@abp/ng.core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-featured-destinations',
  templateUrl: './featured-destinations.component.html',
  styleUrl: './featured-destinations.component.scss',
})
export class FeaturedDestinationsComponent {
  lang = this.localizationService.currentLang;

  constructor(private localizationService: LocalizationService) {}
}
