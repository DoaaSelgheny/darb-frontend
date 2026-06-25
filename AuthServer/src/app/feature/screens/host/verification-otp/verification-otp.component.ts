import { Component } from '@angular/core';
import { VerificationOtpComponent } from '../../shared/verification-otp/verification-otp.component';
import { UserType } from '@proxy/shared/enums';

@Component({
  selector: 'app-host-verification-otp',
  templateUrl: './verification-otp.component.html',
  styleUrls: ['./verification-otp.component.scss'],
  imports: [VerificationOtpComponent],
  standalone: true,
})
export class HostVerificationOtpComponent {
  userType = UserType.Host;
}
