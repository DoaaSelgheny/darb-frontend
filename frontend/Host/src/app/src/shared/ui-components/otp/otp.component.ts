import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ProfileDto } from '@volo/abp.ng.account/public/proxy';
import { NgOtpInputModule } from 'ng-otp-input';
import { Subscription, timer } from 'rxjs';
import { ConfigurationService } from 'src/app/feature/profile/services/configuration.service';
import { HyyakOtpType } from 'src/app/feature/profile/services/hyyak-otp-type.enum';
import { ProfileService } from 'src/app/feature/profile/services/profile.service';
import { SharedModule } from 'src/shared/shared.module';
import { markControlsAsDirty } from 'src/shared/utilties/markAsDirty';
import { UpdatedAccountDetailsComponent } from '../updated-account-details/updated-account-details.component';
import { NUMBERS_ONLY } from 'src/shared/directives/validation-regex';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [NgOtpInputModule, SharedModule, UpdatedAccountDetailsComponent],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
})
export class OtpComponent implements OnChanges {
  @Input() open = false;
  @Input() contactInfo;
  @Input() verified: boolean;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() verifiedOtp = new EventEmitter<any>();

  @ViewChild('ngOtpInput') ngOtpInputRef: any;
  form: FormGroup;
  countDowns: Subscription[] = [];
  counters: number[] = [];
  tick = 1000;
  isTimerDone: boolean = false;
  isVisible: boolean = false;
  otpUpdated = null;
  otpType = HyyakOtpType;
  updatedForm: any;

  constructor(
    private fb: FormBuilder,
    private configurationService: ConfigurationService,
    private profileService: ProfileService,
  ) {
    this.formBuilder();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes.open && changes.open.currentValue) ||
      (changes.open && changes.open.previousValue)
    ) {
      this.stopCounter();
      const index = this.counters.length;
      this.startCounter(index);
      if (this.open && !this.updatedForm) {
        this.sendOtp();
      }
    } else {
      this.stopCounter();
    }
  }

  formBuilder() {
    this.form = this.fb.group({
      otp: [null, [Validators.required, Validators.minLength(4), Validators.pattern(NUMBERS_ONLY)]],
    });
  }

  closePopup() {
    this.open = false;
    this.openChange.emit(this.open);
    this.otpUpdated = null;
    this.form.reset();
    this.updatedForm?.form.reset();
    this.updatedForm = null;
  }

  resendOTP() {
    this.sendOtp();
    this.stopCounter(0);
    this.startCounter(0);
    this.ngOtpInputRef.otpForm.reset();
    this.isTimerDone = false;
    this.ngOtpInputRef?.otpForm?.enable();
  }

  startCounter(index: number) {
    this.counters[index] = 60; // Initial counter value in seconds

    this.countDowns[index] = timer(0, this.tick).subscribe(() => {
      this.counters[index]--;
      if (this.counters[index] === 0) {
        this.stopCounter(index);
        this.ngOtpInputRef?.otpForm?.disable();
        this.isTimerDone = true;
      }
    });
  }

  stopCounter(index?: number) {
    if (index !== undefined && this.countDowns[index]) {
      this.countDowns[index].unsubscribe();
    } else {
      this.countDowns.forEach(cd => cd.unsubscribe());
      this.countDowns = [];
      this.counters = [];
      this.isTimerDone = false;
    }
  }

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2);
  }

  verify(): void {
    this.verifyOtp();
  }

  verifyOtp(): void {
    if (this.form.valid) {
      this.configurationService
        .verifyOtpByOtpTypeAndToken(this.contactInfo.type, this.form.value.otp)
        .subscribe(result => {
          if (result) {
            if (this.verified && !this.updatedForm) {
              this.closePopup();
              this.isVisible = true;
            } else this.handleUpdate();
          }
        });
    } else {
      markControlsAsDirty(this.form);
    }
  }

  sendOtp(): void {
    // if (this.form.valid) {
    this.configurationService
      .sendOtp(
        this.contactInfo.type,
        this.updatedForm?.form?.controls['newPhoneNumber']?.value
          ? this.updatedForm.form.controls['newPhoneNumber']?.value
          : this.contactInfo.value.replace(/\s/g, ''),
      )
      .subscribe(result => {
        this.isVisible = false;
      });
  }

  closeUpdatePopup(value) {
    this.isVisible = value;
  }

  handleOpenOTP(otp) {
    this.otpUpdated = otp;
    this.open = this.otpUpdated.value;
    this.openChange.emit(this.open);
  }

  handleVerifiedAccount(event) {
    this.open = true;
    this.verified = false;
    this.contactInfo.value = event;
    if (this.contactInfo.type === this.otpType.ChangePhoneNumber) {
      this.updateProfileNumber(event);
    } else {
      this.updateProfileEmail(event);
    }
  }

  handleUpdate(): void {
    if (
      this.contactInfo?.type === this.otpType.ChangePhoneNumber ||
      this.contactInfo?.type === this.otpType.ConfirmPhoneNumber
    ) {
      const newPhoneNumber =
        this.updatedForm?.form?.controls['newPhoneNumber']?.value?.internationalNumber ||
        this.contactInfo.value;
      this.updateProfileNumber(newPhoneNumber);
    } else {
      const newEmail = this.updatedForm?.form.controls['newEmail']?.value || this.contactInfo.value;
      this.updateProfileEmail(newEmail);
    }
  }

  updateProfileNumber(newPhoneNumber: string): void {
    if (this.form.valid) {
      this.profileService.updateProfileNumberByPhoneNumber(newPhoneNumber).subscribe(result => {
        if (result) {
          this.verifiedOtp.emit(result);
          this.closePopup();
        }
      });
    } else {
      markControlsAsDirty(this.form);
    }
  }

  updateProfileEmail(newEmail: string): void {
    if (this.form.valid) {
      this.profileService.updateProfileEmailByEmail(newEmail).subscribe(result => {
        if (result) {
          this.verifiedOtp.emit(result);
          this.closePopup();
        }
      });
    } else {
      markControlsAsDirty(this.form);
    }
  }

  handleUpdatedForm(event) {
    this.updatedForm = event;
  }
}

export function zeroOnlyValidator(control: AbstractControl): ValidationErrors | null {
  const otpValue = control.value;

  if (otpValue !== '0'.repeat(control.value?.length || 0)) {
    return { zeroOnly: true }; // Error message key
  }

  return null;
}
