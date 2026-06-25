import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { VerificationOtpComponent } from './screens/verification-otp/verification-otp.component';
import { LogoutComponent } from './screens/logout.Component';
import { RegisterComponent } from './screens/register/register.component';
import { AuthLayoutComponent } from './screens/auth-layout/auth-layout.component';

const routes: Routes = [
   {path: '',
      component: AuthLayoutComponent,
      children: [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'logout', component: LogoutComponent },
        { path: 'verification', component: VerificationOtpComponent },
        { path: 'register', component: RegisterComponent },
      ]
    }
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
