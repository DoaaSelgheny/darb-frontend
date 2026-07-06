import { AuthenticationService } from './../../../../proxy/authentication/authentication.service';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { getErrorFromRequestBody, ToasterService } from '@abp/ng.theme.shared';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { markAllAsDirty } from 'src/shared/helpers/markAllAsDirty';
import { SecurityService } from '../../../services/security.service';
import { RegisterModel } from 'src/app/feature/models/register.model';
import {
  CountryISO,
  NgxIntlTelInputModule,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input-gg';
import {
  ARABIC_ENGLISH_WITH_SPACES_WITHOUT_NUMBERS,
  emailRegex,
} from 'src/shared/directives/validation-regex';
import { LoginSession } from 'src/shared/models/login-session';
import { LocalStorageKeys } from 'src/shared/constants/local-storage-keys';
import { LoginMethod } from '@proxy/account';
import { CompleteRegisterationRequestDto } from '@proxy/authentication';
import { AuthService } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SharedModule } from 'src/app/feature/screens/shared/shared.module';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import { UserType } from '@proxy/shared/enums';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    SharedModule,
    NgxSpinnerModule,
    UiComponentsModule,
    FormsModule,
    NgxIntlTelInputModule,
  ],
})
export class RegisterComponent {
  form: FormGroup;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  onlySaudiCountry = CountryISO.Syria;
  SearchCountryField = SearchCountryField;
  preferredCountries = [CountryISO.Syria, CountryISO.Egypt];
  selectedCountryISO = CountryISO.Syria;
  showErrorTerms: boolean;
  loginMethod: LoginMethod;
  loginMethodEnum = LoginMethod;
  isSend: boolean = false;
  storedSession: LoginSession;
  @Input({ required: true }) userType = UserType.Guest;
  returnUrl: string;
  loginUrl: string;
  successUrl: string;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private ngxSpinnerService: NgxSpinnerService,
    private toasterService: ToasterService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.storedSession = JSON.parse(localStorage.getItem(LocalStorageKeys.LOGIN_SESSION_KEY));
    if (!this.storedSession) {
      this.goToLogin();
    }
  }
  ngOnInit(): void {
    this.loginUrl = this.userType === UserType.Guest ? '/auth/login' : '/host/login';
    this.successUrl = this.userType === UserType.Guest ? '/auth/success' : '/host/success';
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.returnUrl = queryParams.get('returnUrl');
      if (!this.returnUrl) {
        alert('returnUrl is null');
      }
      console.log(this.returnUrl);
    });
    this.loginMethod = this.storedSession.loginMethod;
    this.form = this.fb.group({
      sessionId: this.storedSession.sessionId,
      phoneNumber: this.fb.control(this.storedSession.phoneNumber, [Validators.required]),
      name: this.fb.control('', [
        Validators.required,
        Validators.pattern(ARABIC_ENGLISH_WITH_SPACES_WITHOUT_NUMBERS),
      ]),
      surname: this.fb.control('', [
        Validators.required,
        Validators.pattern(ARABIC_ENGLISH_WITH_SPACES_WITHOUT_NUMBERS),
      ]),
      email: this.fb.control(this.storedSession.email, [Validators.pattern(emailRegex)]),
      termsAndCondition: this.fb.control(false, [Validators.required]),
      gRecaptchaResponse: this.fb.control(null, [Validators.required]),
    });
  }
  resolved(captchaResponse: string) {
    if (captchaResponse) this.form.controls['gRecaptchaResponse'].setValue(captchaResponse);
    else this.form.controls['gRecaptchaResponse'].setValue(null);
  }
  validForm(): void {
    if (this.termsAndConditionControl.value != true) {
      this.showErrorTerms = true;
    }
  }
  submit() {
    this.validForm();
    markAllAsDirty(this.form);
    if (this.form.invalid || this.termsAndConditionControl.value != true) {
      return;
    }
    let registerModel: CompleteRegisterationRequestDto = {
      email: this.form.controls['email'].value ?? '',
      sessionId: this.storedSession.sessionId,
      name: this.form.controls['name'].value ?? '',
      surname: this.form.controls['surname'].value ?? '',
      // key: this.storedSession.
      phoneNumber: this.form.controls['phoneNumber'].value.e164Number ?? '',
      key: this.storedSession.tokenKey,
    };

    this.isSend = true;
    this.ngxSpinnerService.show();
    this.loading = true;
    this.authenticationService
      .completeRegisteration(registerModel, { skipHandleError: true })
      .subscribe({
        next: next => {
          this.ngxSpinnerService.hide();
          this.isSend = false;
          this.loading = false;
          // localStorage.setItem('redirectURL', success.url);
          this.router.navigate([this.successUrl], {
            queryParamsHandling: 'merge',
            queryParams: {
              returnUrl: `${this.returnUrl}?session_id=${this.storedSession.sessionId}&key=${this.storedSession.tokenKey}`,
            },
            replaceUrl: true,
          });
        },
        error: err => {
          this.ngxSpinnerService.hide();
          this.isSend = false;
          const error = getErrorFromRequestBody(err.error.error);
          const errorMessage = error.message as string;
          this.toasterService.error(errorMessage);
          this.loading = false;
        },
      });
  }

  goToLogin() {
    this.router.navigate([this.loginUrl], { queryParamsHandling: 'merge', replaceUrl: true });
  }

  get termsAndConditionControl() {
    return this.form.get('termsAndCondition');
  }
}
