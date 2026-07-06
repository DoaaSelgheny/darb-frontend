import { AuthenticationService } from './../../../../proxy/authentication/authentication.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { markAllAsDirty } from 'src/shared/helpers/markAllAsDirty';
import { getErrorFromRequestBody, ToasterService } from '@abp/ng.theme.shared';
import { NUMBERS_ONLY } from 'src/shared/directives/validation-regex';
import { vaidationType } from 'src/shared/directives/vaidationTypeEnum';
import { AuthService } from '@abp/ng.core';
import { StartSessionRequestDto, VerifyOtpRequestDto } from '@proxy/authentication';
import { LoginMethod } from '@proxy/account';
import { UserType } from '@proxy/shared/enums';
import { LoginSession } from 'src/shared/models/login-session';
import { LocalStorageKeys } from 'src/shared/constants/local-storage-keys';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { SharedModule } from 'src/app/feature/screens/shared/shared.module';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-verification-otp',
  templateUrl: './verification-otp.component.html',
  styleUrls: ['./verification-otp.component.scss'],
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
export class VerificationOtpComponent implements OnInit {
  form: FormGroup;
  phoneNumber: any;
  timeLeft: number = 120;
  timer?: NodeJS.Timeout;
  formattedTime: string = '01:59';
  isSend: boolean = false;
  vaidationTypeEnum = vaidationType;
  storedSession: LoginSession;
  isPhone: boolean;
  returnUrl: string;
  loading = false;
  @Input({ required: true }) userType = UserType.Guest;
  userTypeEnum = UserType;
  registerUrl = '';
  loginUrl = '';
  constructor(
    private formbuilder: FormBuilder,
    // private securityService: SecurityService,
    private abpAuthService: AuthService,
    private authenticationService: AuthenticationService,
    private ngxSpinnerService: NgxSpinnerService,
    private toasterService: ToasterService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.storedSession = JSON.parse(localStorage.getItem(LocalStorageKeys.LOGIN_SESSION_KEY));
    if (!this.storedSession) {
      this.goToLogin();
    }
    this.isPhone = this.storedSession.loginMethod == LoginMethod.MobilePhone;
  }
  initForm() {
    this.form = this.formbuilder.group({
      char1: [null, [Validators.required, Validators.pattern(NUMBERS_ONLY)]],
      char2: [null, [Validators.required, Validators.pattern(NUMBERS_ONLY)]],
      char3: [null, [Validators.required, Validators.pattern(NUMBERS_ONLY)]],
      char4: [null, [Validators.required, Validators.pattern(NUMBERS_ONLY)]],
    });
  }
  ngOnInit(): void {
    this.registerUrl = this.userType === UserType.Guest ? '/auth/register' : '/host/register';
    this.loginUrl = this.userType === UserType.Guest ? '/auth/login' : '/host/login';

    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.returnUrl = queryParams.get('returnUrl');
      if (!this.returnUrl) {
        alert('returnUrl is null');
      }
      console.log(this.returnUrl);
    });
    this.phoneNumber = this.storedSession.phoneNumber;
    this.initForm();
    this.timeLeft = 120;
    this.startTimer();
  }

  resend() {
    let loginModel: StartSessionRequestDto = {
      phoneNumber: this.storedSession.phoneNumber,
      email: this.storedSession.email,
      //temp email login
      loginMethod: this.storedSession.loginMethod,
      userType: UserType.Guest,
    };
    this.authenticationService.startSession(loginModel, { skipHandleError: true }).subscribe({
      next: success => {
        this.storedSession.sessionId = success.sessionId;
        this.storedSession.otpCode = success.otp;
        this.storedSession.isNewUser = success.isNewUser;

        localStorage.setItem(
          LocalStorageKeys.LOGIN_SESSION_KEY,
          JSON.stringify(this.storedSession),
        );
        this.timeLeft = 120;
        this.startTimer();
      },
      error: err => {
        this.isSend = false;
        const error = getErrorFromRequestBody(err.error.error);
        const errorMessage = error.message as string;
        this.toasterService.error(errorMessage);
      },
    });
  }
  validateNumber(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  movetoNext(e: KeyboardEvent) {
    const target = e.target as HTMLInputElement;

    // Move to previous input on Backspace when empty
    if (e.key === 'Backspace' && target.value === '') {
      let prevControl = target.previousElementSibling as HTMLInputElement;
      while (prevControl) {
        if (prevControl.tagName === 'INPUT' && prevControl.type === 'text') {
          prevControl.focus();
          return;
        }
        prevControl = prevControl.previousElementSibling as HTMLInputElement;
      }
    }

    // Move to next input when a number is entered
    else if (target.value !== '' && e.key !== 'Backspace') {
      let nextControl = target.nextElementSibling as HTMLInputElement;
      while (nextControl) {
        if (nextControl.tagName === 'INPUT' && nextControl.type === 'text') {
          nextControl.focus();
          return;
        }
        nextControl = nextControl.nextElementSibling as HTMLInputElement;
      }
    }
  }

  submit() {
    let model: VerifyOtpRequestDto = {
      sessionId: this.storedSession.sessionId,
      otp:
        this.form.controls['char1'].value +
        this.form.controls['char2'].value +
        this.form.controls['char3'].value +
        this.form.controls['char4'].value,
    };
    console.log('Session Id => ', model);

    if (this.form.valid) {
      this.isSend = true;
      this.ngxSpinnerService.show();
      this.loading = true;
      this.authenticationService
        .verifyOtp(model, {
          skipHandleError: true,
        })
        .subscribe({
          next: success => {
            this.storedSession.tokenKey = success.tokenKey;
            localStorage.setItem(
              LocalStorageKeys.LOGIN_SESSION_KEY,
              JSON.stringify(this.storedSession),
            );
            localStorage.setItem('userType', this.userType.toString());
            if (this.storedSession.isNewUser) {
              this.router.navigate([this.registerUrl], {
                queryParamsHandling: 'merge',
                replaceUrl: true,
              });
            } else {
              localStorage.removeItem(LocalStorageKeys.LOGIN_SESSION_KEY);
              location.replace(
                `${this.returnUrl}?session_id=${this.storedSession.sessionId}&key=${this.storedSession.tokenKey}`,
              );
            }
            this.loading = false;
            this.ngxSpinnerService.hide();
            this.isSend = false;
          },
          error: err => {
            if (err.status === 302) {
              this.router.navigate([this.registerUrl], {
                queryParamsHandling: 'merge',
                replaceUrl: true,
              });
            } else {
              const error = getErrorFromRequestBody(err.error.error);
              const errorMessage = error.message as string;
              this.toasterService.error(errorMessage);
              this.loading = false;
              this.ngxSpinnerService.hide();
              this.isSend = false;
            }
          },
        });
    } else {
      markAllAsDirty(this.form);
    }
  }
  startTimer() {
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.formattedTime = this.formatTime(this.timeLeft);
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${this.padZero(minutes)}:${this.padZero(secs)}`;
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  goToLogin() {
    this.router.navigate([this.loginUrl], { queryParamsHandling: 'merge', replaceUrl: true });
  }
}
