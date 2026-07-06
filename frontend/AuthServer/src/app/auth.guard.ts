// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (!this.isAuthenticated()) {
        console.log("kkkkk");
        
      return true;
    } else {
        console.log("mkdmckdmck")
        window.open('https://dev-hyyak-ehgja0c6bucpftd0.eastus-01.azurewebsites.net/')
      // redirect if not logged in
    //   return this.router.parseUrl('/login');
    }
  }
  isAuthenticated(): boolean {
    // Example: check token in localStorage
    const token = localStorage.getItem('access_token');
   console.log(token,"DODODO");
   
    return !!token; // true if token exists
  }
}
