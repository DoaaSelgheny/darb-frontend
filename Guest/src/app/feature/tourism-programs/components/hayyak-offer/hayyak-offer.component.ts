import { CoreModule } from '@abp/ng.core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hayyak-offer',
  standalone: true,
  imports: [CoreModule],
  templateUrl: './hayyak-offer.component.html',
  styleUrl: './hayyak-offer.component.scss',
})
export class HayyakOfferComponent {}
