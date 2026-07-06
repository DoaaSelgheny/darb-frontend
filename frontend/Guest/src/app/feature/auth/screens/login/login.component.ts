import { AuthService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input-gg';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // this component's template isn't used, and is being redirected to the server's login
  constructor(

    private router: Router,
    private authService: AuthService,
  ) {
    
  }
  loginType: string = 'email';



  
  ngOnInit(): void {
    // this.form = this.fb.group({
   
    //   phoneNumber: this.fb.control('', [Validators.required]),
    //   email: this.fb.control('', [Validators.required, Validators.email]),
    //   captcha: this.fb.control(null, [Validators.required]),
    // });
      
    if (!this.authService.isAuthenticated) this.authService.navigateToLogin();
    else {
      this.router.navigate(['/']);
    }
  }

}
