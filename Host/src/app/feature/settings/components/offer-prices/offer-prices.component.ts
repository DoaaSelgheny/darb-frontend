import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offer-prices',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './offer-prices.component.html',
  styleUrl: './offer-prices.component.scss',
})
export class OfferPricesComponent {
  isEmpty: boolean = false;
}
