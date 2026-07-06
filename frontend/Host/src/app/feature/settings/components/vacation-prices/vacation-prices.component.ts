import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'app-vacation-prices',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './vacation-prices.component.html',
  styleUrl: './vacation-prices.component.scss',
})
export class VacationPricesComponent {}
