import { Component } from '@angular/core';
import { VerificationOtpComponent } from '../../shared/verification-otp/verification-otp.component';
import { UserType } from '@proxy/shared/enums';

@Component({
  selector: 'app-guest-verification-otp',
  templateUrl: './verification-otp.component.html',
  styleUrls: ['./verification-otp.component.scss'],
  standalone: true,
  imports: [VerificationOtpComponent],
})
export class GuestVerificationOtpComponent {
    userType = UserType.Guest;
   

}
