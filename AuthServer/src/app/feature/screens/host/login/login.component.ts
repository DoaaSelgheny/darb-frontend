import { Component } from '@angular/core';
import { LoginComponent } from '../../shared/login/login.component';
import { UserType } from '@proxy/shared/enums';
@Component({
  selector: 'app-host-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:true,
  imports: [LoginComponent]
})
export class HostLoginComponent {
  userType = UserType.Host;
}
