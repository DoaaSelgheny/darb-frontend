import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './screens/login/login.component';
import { VerificationOtpComponent } from './screens/verification-otp/verification-otp.component';

import { NgOtpInputModule } from 'ng-otp-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, VerificationOtpComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgOtpInputModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
