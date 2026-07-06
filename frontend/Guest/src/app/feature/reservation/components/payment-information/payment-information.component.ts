import { Component, Input } from '@angular/core';
import { PaymentType } from '@proxy/reservation-users';
import { SharedModule } from 'src/shared/shared.module';

@Component({
  selector: 'app-payment-information',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './payment-information.component.html',
  styleUrl: './payment-information.component.scss'
})
export class PaymentInformationComponent {
  @Input() data: any;
  @Input() isVaction: boolean;
  PaymentType=PaymentType

}
