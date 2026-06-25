import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'app-prices-occasions',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './prices-occasions.component.html',
  styleUrl: './prices-occasions.component.scss',
})
export class PricesOccasionsComponent {}
