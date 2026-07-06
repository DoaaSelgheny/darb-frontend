import { AuthenticationService } from './../../../../proxy/authentication/authentication.service';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import {
  CountryISO,
  NgxIntlTelInputModule,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input-gg';
import { getErrorFromRequestBody, ToasterService } from '@abp/ng.theme.shared';
import { AuthService } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LoginMethod } from '../../../../proxy/account/login-method.enum';
import { SharedModule } from '../shared.module';
import { StartSessionRequestDto } from '@proxy/authentication';
import { UserType } from '@proxy/shared/enums';
import { environment } from 'src/environments/environment';
import { LocalStorageKeys } from 'src/shared/constants/local-storage-keys';
import { emailRegex } from 'src/shared/directives/validation-regex';
import { markAllAsDirty } from 'src/shared/helpers/markAllAsDirty';
import { LoginSession } from 'src/shared/models/login-session';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    NgxSpinnerModule,
    FormsModule,
    NgxIntlTelInputModule,
    CommonModule,
    NzIconModule,
    SharedModule,
    NgxSpinnerModule,
    FormsModule,
    NgxIntlTelInputModule,
  ],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private authService: AuthService,
    private router: Router,
    private toasterService: ToasterService,
    private ngxSpinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
  ) {}
  loginMethod: LoginMethod = LoginMethod.MobilePhone;
  loginMethodEnum = LoginMethod;
  captchaResponse: boolean = false;
  CountryISO = CountryISO;
  phoneNumberFormat = PhoneNumberFormat.International;
  onlySaudiCountry = CountryISO.Syria;
  SearchCountryField = SearchCountryField;
  preferredCountries = [CountryISO.Syria, CountryISO.Egypt];
  selectedCountryISO = CountryISO.Syria;
  form: FormGroup;
  loading = false;
  isSend = false;
  @Input({ required: true }) userType = UserType.Guest;
  userTypeEnum = UserType;
  ngOnInit(): void {
    this.initForm();
    localStorage.removeItem(LocalStorageKeys.LOGIN_SESSION_KEY);
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      const returnUrl = queryParams.get('returnUrl');
      if (!returnUrl) {
        alert('returnUrl is null');
      }
      console.log(returnUrl);
    });
  }
  initForm() {
    this.form = this.fb.group({
      returnUrl: environment.application.baseUrl,
      loginMethod: this.loginMethodEnum.MobilePhone,
      phoneNumber: this.fb.control('', []),
      email: this.fb.control('', []),
      countryCode: this.fb.control(''),
      dialCode: this.fb.control(''),
      recaptchaResponse: this.fb.control(null, [Validators.required]),
    });
    // this.validForm()
  }
  resolved(captchaResponse: string) {
    if (captchaResponse) this.form.controls['recaptchaResponse'].setValue(captchaResponse);
    else this.form.controls['recaptchaResponse'].setValue(null);
  }

  // Handle loginType change
  validForm(): void {
    if (this.userType == UserType.Host || this.loginMethod === LoginMethod.MobilePhone) {
      this.form.get('phoneNumber')?.setValidators([
        Validators.required, // Ensure the phone number is valid
      ]);
      this.form.get('email')?.clearValidators();
    } else {
      this.form.get('email')?.setValidators([Validators.required, Validators.pattern(emailRegex)]);
      this.form.get('phoneNumber')?.clearValidators();
    }

    // Update validity
    this.form.get('phoneNumber')?.updateValueAndValidity();
    this.form.get('email')?.updateValueAndValidity();
  }
  submit() {
    this.validForm();
    let loginModel: StartSessionRequestDto = {
      phoneNumber: this.form.controls['phoneNumber'].value?.e164Number ?? '',
      email: this.form.controls['email'].value ?? '',
      //temp email login
      loginMethod: this.loginMethod,
      userType: this.userType,
    };

    if (this.form.valid) {
      this.isSend = true;
      this.loading = true;
      this.ngxSpinnerService.show();
      this.authenticationService.startSession(loginModel, { skipHandleError: true }).subscribe({
        next: success => {
          this.ngxSpinnerService.hide();
          this.isSend = false;
          let login_session: LoginSession = {
            sessionId: success.sessionId,
            otpCode: success.otp,
            isNewUser: success.isNewUser,
            email: loginModel.email,
            phoneNumber: loginModel.phoneNumber,
            loginMethod: this.loginMethod,
          };
          localStorage.setItem(LocalStorageKeys.LOGIN_SESSION_KEY, JSON.stringify(login_session));
          const verificationRoute =
            this.userType === UserType.Guest ? '/auth/verification' : '/host/verification';
          this.router.navigate([verificationRoute], {
            queryParamsHandling: 'merge',
            replaceUrl:true
          });
        },
        error: err => {
          this.isSend = false;

          this.ngxSpinnerService.hide();
          const error = getErrorFromRequestBody(err.error.error);
          const errorMessage = error.message as string;
          this.toasterService.error(errorMessage);
        },
        complete: () => (this.loading = false),
      });
    } else {
      markAllAsDirty(this.form);
    }
  }
}
