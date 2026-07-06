import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-oauth2-redirect',
  templateUrl: './oauth2-redirect.component.html',
  styleUrls: ['./oauth2-redirect.component.css'],
  standalone: true,
})
export class Oauth2RedirectComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private abpAuthService = inject(AuthService);
  private toasterService = inject(ToasterService);
  private ngxSpinnerService = inject(NgxSpinnerService);
  private router = inject(Router);
  constructor() {}

  ngOnInit() {
    this.ngxSpinnerService.show();
    this.activatedRoute.queryParamMap.subscribe(params => {
      const loginModel = {
        session_id: params.get('session_id'),
        key: params.get('key'),
      };
      this.abpAuthService
        .loginUsingGrant('otp', loginModel)
        .then(() => {
          location.replace(environment.application.baseUrl)
          // this.router.navigate(['/account-verification']);
        })
        .catch(err => {
          let errorMessage = err.error?.error_description || err.error?.error.message;
          this.toasterService.error(errorMessage);
        })
        .finally(() => {
          this.ngxSpinnerService.hide();
        });
    });
  }
}
