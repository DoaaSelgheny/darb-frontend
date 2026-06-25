import { CoreModule, SafeHtmlPipe } from '@abp/ng.core';
import { Component, Input, OnInit } from '@angular/core';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-payment-frame',
  standalone: true,
  imports: [CoreModule, SafePipe],
  templateUrl: './payment-frame.component.html',
  styleUrls: ['./payment-frame.component.css'],
})
export class PaymentFrameComponent implements OnInit {
  @Input()
  paymentUrl: string;

  constructor() {}

  ngOnInit() {}
}
