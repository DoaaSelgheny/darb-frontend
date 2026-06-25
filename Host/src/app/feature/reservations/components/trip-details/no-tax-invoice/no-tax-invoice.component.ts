import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceHostService, InvoicesGuestService } from '@proxy/invoices';
import { SharedModule } from 'src/shared/shared.module';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-no-tax-invoice',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './no-tax-invoice.component.html',
  styleUrl: './no-tax-invoice.component.scss'
})
export class NoTaxInvoiceComponent {
 @Input() data: any;
 @Input() hasTax = false

}
