import { CoreModule } from '@abp/ng.core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cover-section',
  standalone: true,
  imports: [CoreModule],
  templateUrl: './cover-section.component.html',
  styleUrl: './cover-section.component.scss',
})
export class CoverSectionComponent {}
