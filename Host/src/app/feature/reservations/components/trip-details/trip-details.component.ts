import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import * as html2pdf from 'html2pdf.js';
import { InvoiceHostService } from '@proxy/invoices/invoice-host.service';
import { InvoicesGuestService } from '@proxy/invoices/invoices-guest.service';
import { ActivatedRoute } from '@angular/router';
import { TaxInvoiceComponent } from './tax-invoice/tax-invoice.component';
import { NoTaxInvoiceComponent } from './no-tax-invoice/no-tax-invoice.component';
@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [SharedModule,TaxInvoiceComponent,NoTaxInvoiceComponent],
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.scss',
})
export class TripDetailsComponent implements OnInit {
  @Input() data: any;
  dataTax:any
  isTax = 'false'
  id:any
  constructor(

     private serviceHost:InvoiceHostService,
     private serviceGuest:InvoicesGuestService,
    private route: ActivatedRoute,
   ) {

   }
ngOnInit(): void {

 this.isTax = this.route.snapshot.params['isTax'];
 this.id = this.route.snapshot.params['id'];

 if(this.isTax==='true'){

  this.serviceHost.getInvoiceDetailsByReservationId(this.id).subscribe(x => {
    this.data = x;

     this.serviceHost.getValueAddedTaxInvoiceDetailsByReservationId(this.id).subscribe(x => {
       this.dataTax = x;
       setTimeout(() => {
         this.downloadPDF();
       }, 2000);
     });
   });
 }else{

  this.serviceHost.getInvoiceDetailsByReservationId(this.id).subscribe(x => {
    this.data = x;

    this.downloadPDF();
  });
}

 }





 downloadPDF() {
   // const invoiceElement = document.getElementById('invoice');
   // const options = {
   //   filename: 'invoice.pdf',
   //   image: { type: 'jpeg', quality: 0.98 },
   //   html2canvas: { scale: 2 },
   //   jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
   // };
   // html2pdf().from(invoiceElement).set(options).save();
   const invoiceContainer = document.getElementById("invoice-container");

const options = {
 filename: 'invoice.pdf',
 image: { type: 'jpeg', quality: 0.98 },
 html2canvas: { scale: 2 },
 jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
};

html2pdf()
 .from(invoiceContainer)
 .set(options)
 .save();

 }



}
