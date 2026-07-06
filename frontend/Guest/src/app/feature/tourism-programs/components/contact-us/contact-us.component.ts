import { CoreModule } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactusService } from '@proxy/contactuses';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service, RecaptchaModule } from 'ng-recaptcha';
import { markAllAsDirty } from 'src/shared/helpers/markAllAsDirty';
import { SharedModule } from 'src/shared/shared.module';
import { ConfrontationTypes } from 'src/shared/ui-components/confrontation-popup/confrontation-types.enum';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [UiComponentsModule, RecaptchaModule, RouterModule, CoreModule, SharedModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  providers: [
    ReCaptchaV3Service,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LcVXH4pAAAAAH8eyL7Ah1NnXmxvPqS9mT1UxB3K',
    },
  ],
})
export class ContactUsComponent {
  isVisibleSend: boolean = false;
  captchaResponse: boolean = false;
  confrontationTypesEnum = ConfrontationTypes;
  form: FormGroup;
  constructor(
    private recaptchaV3Service: ReCaptchaV3Service,
    private toaster: ToasterService,
    private fb: FormBuilder,
    private service: ContactusService,
  ) {
    this.formBuilder();
  }

  formBuilder() {
    this.form = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      message: new FormControl(null, [Validators.required]),
      individual: new FormControl(true, [Validators.required]),
      captcha: new FormControl(null, [Validators.required]),
    });
  }

  sendMessage() {
    if (this.form.valid) {
      this.isVisibleSend = true;
      this.service
        .create({
          ...this.form.value,
        })
        .subscribe(data => {
          this.toaster.success('تم إسال طلبك بنجاح ');
        });
    } else {
      markAllAsDirty(this.form);
    }
  }

  resolved(captchaResponse: string) {
    if (captchaResponse) this.form.controls['captcha'].setValue(captchaResponse);
    else this.form.controls['captcha'].setValue(null);
  }
}
