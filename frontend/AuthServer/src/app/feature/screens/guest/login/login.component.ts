import { Component } from '@angular/core';
import { LoginComponent } from '../../shared/login/login.component';
import { UserType } from '@proxy/shared/enums';
@Component({
  selector: 'app-guest-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [LoginComponent],
})
export class GuestLoginComponent {
  userType = UserType.Guest;
}
