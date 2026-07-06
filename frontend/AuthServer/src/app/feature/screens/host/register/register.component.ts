import { Component } from '@angular/core';
import { RegisterComponent } from '../../shared/register/register.component';
import { UserType } from '@proxy/shared/enums';

@Component({
  selector: 'app-host-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  imports: [RegisterComponent],
})
export class HostRegisterComponent {
  userType = UserType.Host;
}
