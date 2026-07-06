import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreModule } from '@abp/ng.core';
import { CountryISO, NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { SharedModule } from 'src/shared/shared.module';
import { OtpComponent } from 'src/shared/ui-components/otp/otp.component';
import { HyyakOtpType } from 'src/shared/layout/header/configuration/hyyak-otp-type.enum';
import { ProfileService } from 'src/app/feature/profile/profiles/profile.service';
import { markAllAsDirty } from 'src/shared/helpers/markAllAsDirty';
import { ConfigurationService } from 'src/shared/layout/header/configuration/configuration.service';

@Component({
  selector: 'app-updated-account-details',
  standalone: true,
  imports: [SharedModule, CoreModule, NgxIntlTelInputModule, OtpComponent],
  templateUrl: './updated-account-details.component.html',
  styleUrl: './updated-account-details.component.scss',
})
export class UpdatedAccountDetailsComponent implements OnChanges {
  @Input() openUpdate = false;
  @Input() contactInfo;
  @Output() openUpdateChange = new EventEmitter<boolean>();
  @Output() openOtp = new EventEmitter<{}>();
  @Output() verifiedAccount = new EventEmitter<any>();
  @Output() updatedForm = new EventEmitter<any>();

  form: FormGroup = new FormGroup({});
  selectedCountryISO;
  otpType = HyyakOtpType;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private configurationService: ConfigurationService,
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.contactInfo?.type == this.otpType.ChangePhoneNumber) {
      const mobileNumber = this.contactInfo?.value.split(' ');
      this.selectedCountryISO = this.contactInfo?.countryCode || CountryISO.Syria;
      mobileNumber.shift();

      this.form.controls['previousPhoneNumber']?.disable();
      this.form.controls['previousPhoneNumber']?.setValue(mobileNumber.join(' '));
      this.form.controls['previousPhoneNumber']?.setValue(mobileNumber.join(' '));
      this.form.controls['newPhoneNumber']?.setValidators(Validators.required);
      this.form.controls['newEmail']?.setValidators([]);
    } else {
      this.form.controls['previousEmail']?.disable();
      this.form.controls['previousEmail']?.setValue(this.contactInfo.value);
      this.form.controls['newEmail']?.setValidators([Validators.required, Validators.email]);
      this.form.controls['newPhoneNumber']?.setValidators([]);
    }
  }

  ngOnInit(): void {
    this.handleForm();
  }

  handleForm() {
    this.form = this.fb.group({
      previousPhoneNumber: this.fb.control(''),
      newPhoneNumber: this.fb.control(''),
      previousEmail: this.fb.control(''),
      newEmail: this.fb.control(''),
    },
    { validators: this.emailsNotEqualValidator });
  }
  emailsNotEqualValidator(group: FormGroup) {
    const previousEmail = group.get('previousEmail')?.value;
    const newEmail = group.get('newEmail')?.value;

    return previousEmail && newEmail && previousEmail === newEmail
      ? { emailsMatch: true } // Validation error
      : null; // Valid
  }
// Helper to check validation state
hasError(controlName: string, errorName: string): boolean {
  const control = this.form.get(controlName);
  return control?.hasError(errorName) && (control?.dirty || control?.touched);
}

// Helper to check if form group has custom error
get emailsMatchError() {
  return this.form.hasError('emailsMatch');
}
  closePopup() {
    this.openUpdate = false;
    this.submitted = false;
    this.openUpdateChange.emit(this.openUpdate);
  }
  sendOtp(): void {
    this.submitted = true;

    if (this.form.valid) {
      this.submitted = false;
      this.configurationService
        .sendOtp(
          this.contactInfo.type,
          this.form.value?.newPhoneNumber?.internationalNumber || this.form.value?.newEmail,
        )
        .subscribe(result => {
          this.openOtp.emit({
            value: true,
            updated: true,
            contactInfo: this.contactInfo,
            verified: false,
          });
          this.updatedForm.emit({ form: this.form });
          this.closePopup();
        });
    } else {
      markAllAsDirty(this.form);
    }
  }
}
