import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

export const HostRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(c => c.HostLoginComponent),
      },
      {
        path: 'verification',
        loadComponent: () =>
          import('./verification-otp/verification-otp.component').then(
            c => c.HostVerificationOtpComponent,
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./register/register.component').then(c => c.HostRegisterComponent),
      },
      {
        path: 'success',
        loadComponent: () =>
          import('./success/success.component').then(c => c.HostSuccessComponent),
      },
    ],
  },
];
export class AuthRoutingModule {}
