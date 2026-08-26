import { AuthService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: ``,
})
export class LogoutComponent {
  loginType: string = 'email';
  constructor(private authService: AuthService, private router: Router) {
    this.authService.logout().subscribe();
  }
}
