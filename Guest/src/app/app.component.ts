import { AuthService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { eAccountRouteNames } from '@volo/abp.ng.account/public/config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'hyyak';
  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {
    if (
      environment.authRedirectUrls?.filter((x: string) => document.referrer?.includes(x)).length
    ) {
      if (!this.authService.isAuthenticated) {
        this.authService.navigateToLogin();
      }
    }

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    // this.activatedRoute.queryParamMap.subscribe(params => {
    //   let authorizationCode = params.get('code');

    //   if (authorizationCode) {
    //     this.authService
    //       .loginUsingGrant('authorization_code', {
    //         code: authorizationCode,
    //         scope: '',
    //         redirect_uri: environment.oAuthConfig.redirectUri,
    //       })
    //       .then(c => {
    //         location.assign(environment.oAuthConfig.redirectUri)
    //       });
    //   }
    // });
  }
}
