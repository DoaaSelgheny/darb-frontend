import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

export const GuestRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(c => c.GuestLoginComponent),
      },
      {
        path: 'verification',
        loadComponent: () =>
          import('./verification-otp/verification-otp.component').then(
            c => c.GuestVerificationOtpComponent,
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./register/register.component').then(c => c.GuestRegisterComponent),
      },
      {
        path: 'success',
        loadComponent: () =>
          import('./success/success.component').then(c => c.GuestSuccessComponent),
      },
    ],
  },
];
