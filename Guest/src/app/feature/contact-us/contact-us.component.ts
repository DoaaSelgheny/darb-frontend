import { CoreModule, LocalizationService } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactusService } from '@proxy/contactuses';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaModule } from 'ng-recaptcha';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { CountryISO, NgxIntlTelInputModule, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input-gg';
import { markAllAsDirty } from 'src/shared/helpers/markAllAsDirty';
import { SharedModule } from 'src/shared/shared.module';
import { ConfrontationTypes } from 'src/shared/ui-components/confrontation-popup/confrontation-types.enum';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [UiComponentsModule, RouterModule, RecaptchaModule, CoreModule, SharedModule,
    NzModalModule,NgxIntlTelInputModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LcVXH4pAAAAAH8eyL7Ah1NnXmxvPqS9mT1UxB3K',
    },
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
  form: FormGroup;
  isVisibleSend: boolean = false;
  captchaResponse: boolean = false;
  confrontationTypesEnum = ConfrontationTypes;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  onlySaudiCountry = CountryISO.SaudiArabia;
  SearchCountryField = SearchCountryField;
  preferredCountries = [CountryISO.SaudiArabia, CountryISO.Egypt];
  selectedCountryISO = CountryISO.SaudiArabia;
lang = this.localizationService.currentLang;
  constructor(
    private toaster: ToasterService,
    private fb: FormBuilder,
    private service: ContactusService,
    private localizationService: LocalizationService,
    private modal: NzModalRef
  ) {
    this.formBuilder();
  }

  formBuilder() {
    this.form = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      topicType: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
    phoneNumber: ['', { validators: [Validators.required], updateOn: 'blur' }]
      
    });
  }
  sendMessage() {
    if (this.form.valid) {
      this.isVisibleSend = true;
      this.service
        .create({
          ...this.form.value,
          phoneNumber: this.form.getRawValue().phoneNumber?.internationalNumber,

        })
        .subscribe(data => {
          this.toaster.success('تم ارسال طلبك بنجاح','',{life:50000});
          this.modal.destroy();

        });
    } else {
      markAllAsDirty(this.form);
    }
  }

  resolved(captchaResponse: string) {
    if (captchaResponse) this.form.controls['captcha'].setValue(captchaResponse);
    else this.form.controls['captcha'].setValue(null);
  }

  allowPaste(event: ClipboardEvent): boolean {
    const pastedData = (
      event.clipboardData || event.target["clipboardData"]
    )?.getData("text/plain");
    if (!pastedData || !/^\d+$/.test(pastedData)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
  openNewWindow(url: string) {
    window.open(url, '_blank');
  }
}
