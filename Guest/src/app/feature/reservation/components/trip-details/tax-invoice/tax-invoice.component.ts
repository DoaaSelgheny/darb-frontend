import { Component, Input } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';

@Component({
  selector: 'app-tax-invoice',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './tax-invoice.component.html',
  styleUrl: './tax-invoice.component.scss'
})
export class TaxInvoiceComponent {
@Input() dataTax:any
}
