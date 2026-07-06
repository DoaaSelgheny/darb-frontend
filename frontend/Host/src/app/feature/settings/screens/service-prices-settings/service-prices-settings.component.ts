import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { PricesOccasionsComponent } from '../../components/prices-occasions/prices-occasions.component';
import { OfferPricesComponent } from '../../components/offer-prices/offer-prices.component';
import { VacationPricesComponent } from '../../components/vacation-prices/vacation-prices.component';

@Component({
  selector: 'app-service-prices-settings',
  standalone: true,
  imports: [SharedModule, PricesOccasionsComponent, OfferPricesComponent, VacationPricesComponent],
  templateUrl: './service-prices-settings.component.html',
  styleUrl: './service-prices-settings.component.scss',
})
export class ServicePricesSettingsComponent {}
