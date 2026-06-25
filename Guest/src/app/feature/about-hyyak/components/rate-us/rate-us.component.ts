import { CoreModule } from '@abp/ng.core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-rate-us',
  standalone: true,
  imports: [CoreModule],
  templateUrl: './rate-us.component.html',
  styleUrl: './rate-us.component.scss',
})
export class RateUsComponent {}
