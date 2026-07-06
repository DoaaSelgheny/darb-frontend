import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { CoreModule } from '@abp/ng.core';
import { LocalStorageKeys } from 'src/shared/constants/local-storage-keys';
import { UserType } from '@proxy/shared/enums';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
  standalone: true,
  imports: [CoreModule],
})
export class SuccessComponent implements OnInit {
  returnUrl: string;
  @Input({ required: true }) userType = UserType.Guest;
  loginUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.loginUrl = this.userType === UserType.Guest ? '/auth/login' : '/host/login';

    const storedSession = JSON.parse(localStorage.getItem(LocalStorageKeys.LOGIN_SESSION_KEY));
    if (!storedSession) {
      this.goToLogin();
    }
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.returnUrl = queryParams.get('returnUrl');
      if (!this.returnUrl) {
        alert('returnUrl is null');
      }
      console.log(this.returnUrl);
      localStorage.removeItem(LocalStorageKeys.LOGIN_SESSION_KEY);
    });
  }
  goToRedirectURL() {
    window.location.href = this.returnUrl;
  }

  goToLogin() {
    this.router.navigate([this.loginUrl], { queryParamsHandling: 'merge', replaceUrl: true });
  }
}
