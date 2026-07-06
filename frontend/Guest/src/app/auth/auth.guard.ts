import { AuthService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  constructor(private authService: AuthService,) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated) {
      console.log(state.url, "aifviefvjfivjifvjifvj");
      if (state.url.includes('authUi')) {
        return false;
      }
      else {
        return true;
      }
    } else {
      this.authService.navigateToLogin();
      return false;
    }
  }


}
