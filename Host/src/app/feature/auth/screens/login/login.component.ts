import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@abp/ng.core';
import { PermissionService } from '@abp/ng.core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '@proxy/profiles';
import { AccountVerificationService } from 'src/app/feature/account-verification/services/account-verification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginType: string = 'email';
  form: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private profileService: ProfileService,
    private accountVerificationService: AccountVerificationService,
  ) {}

  ngOnInit(): void {
    let noEmail= this.route.snapshot.queryParamMap.get('no-email') === '';
    if (!this.authService.isAuthenticated)
      this.authService.navigateToLogin((noEmail?{ 'no-email': '' }:null));
    else {
      this.accountVerificationService.getByCreatorId().subscribe(data => {
        const route = data?.isYakeenVerified ? '/holiday-homes' : '/account-verification';
        this.router.navigate([route]);
      });
    }
    //this.handelForm();
  }

  checkIfSaudiNumber(phone: string) {
    const SAUDI_PHONE_CODE = '+966';
    const PHONE_CODE = phone.slice(0, 4);
    return PHONE_CODE !== SAUDI_PHONE_CODE;
  }
  handelForm() {
    this.form = this.fb.group({
      phone: this.fb.control('', Validators.required),
    });
  }
  login() {}
}
