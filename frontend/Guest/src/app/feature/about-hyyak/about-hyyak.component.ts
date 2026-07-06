import { Component } from '@angular/core';
import { CoverSectionComponent } from './components/cover-section/cover-section.component';
import { RateUsComponent } from './components/rate-us/rate-us.component';
import { OurFeaturesComponent } from './components/our-features/our-features.component';

@Component({
  selector: 'app-about-hyyak',
  standalone: true,
  imports: [CoverSectionComponent, RateUsComponent, OurFeaturesComponent],
  templateUrl: './about-hyyak.component.html',
  styleUrl: './about-hyyak.component.scss',
})
export class AboutHyyakComponent {}
