import { ToasterService } from '@abp/ng.theme.shared';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaModule } from 'ng-recaptcha';
import { SharedModule } from 'src/shared/shared.module';
import { ConfrontationTypes } from 'src/shared/ui-components/confrontation-popup/confrontation-types.enum';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [UiComponentsModule, RouterModule, RecaptchaModule, SharedModule],
  providers: [
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LcVXH4pAAAAAH8eyL7Ah1NnXmxvPqS9mT1UxB3K' },
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
  form: FormGroup;
  isVisibleSend: boolean = false;
  captchaResponse: boolean = false;
  confrontationTypesEnum = ConfrontationTypes;

  constructor(
    private toaster: ToasterService,
    private fb: FormBuilder,
  ) {
    this.formBuilder();
  }

  formBuilder() {
    this.form = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      topicType: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
      captcha: new FormControl(null, [Validators.required]),
    });
  }

  sendMessage() {
    if (this.form.valid) {
      this.isVisibleSend = true;
    } else {
      Object.keys(this.form.controls).forEach((key: any) => {
        this.form.get(key).markAsDirty();
      });
    }
  }

  resolved(captchaResponse: string) {
    if (captchaResponse) this.form.controls['captcha'].setValue(captchaResponse);
    else this.form.controls['captcha'].setValue(null);
  }
}
