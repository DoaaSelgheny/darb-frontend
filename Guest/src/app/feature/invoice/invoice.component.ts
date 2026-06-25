import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import { TripInformationComponent } from './components/trip-information/trip-information.component';
import { QRCodeModule } from 'angularx-qrcode';
import { CoreModule } from '@abp/ng.core';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [UiComponentsModule, RouterModule, TripInformationComponent, QRCodeModule, CoreModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss',
})
export class InvoiceComponent {}
