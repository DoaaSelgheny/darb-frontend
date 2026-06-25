import { CoreModule } from '@abp/ng.core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-our-features',
  standalone: true,
  imports: [CoreModule],
  templateUrl: './our-features.component.html',
  styleUrl: './our-features.component.scss',
})
export class OurFeaturesComponent {}
