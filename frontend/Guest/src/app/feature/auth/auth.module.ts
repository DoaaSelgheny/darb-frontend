import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './screens/login/login.component';
import { VerificationOtpComponent } from './screens/verification-otp/verification-otp.component';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import { FormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaModule } from 'ng-recaptcha';
import { SharedModule } from 'src/shared/shared.module';
import { RegisterComponent } from './screens/register/register.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [LoginComponent, VerificationOtpComponent,RegisterComponent],
  imports: [CommonModule, NzIconModule  ,SharedModule, AuthRoutingModule, UiComponentsModule, FormsModule,NgxIntlTelInputModule,   RecaptchaModule,],

})
export class AuthModule {}
