import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/shared/layout/layout.component';
import { SuccessComponent } from './feature/payment/components/success/success.component';
import { PageNotFoundComponent } from 'src/shared/page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { NotAvailablePageComponent } from 'src/shared/not-available-page/not-available-page.component';
import { AuthLayoutComponent } from './feature/auth/screens/auth-layout/auth-layout.component';

const routes: Routes = [
  { path: 'success', component: SuccessComponent },
  {
    path: 'auth-callback',
    loadComponent: () =>
      import('./feature/auth/auth-callback.component').then(c => c.AuthCallbackComponent),
  },

  { path: 'error', component: NotAvailablePageComponent },

  {
    path: 'auth',
    loadChildren: () => import('./feature/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'host-landing',
    loadChildren: () => import('./host-landing/host-landing.module').then(m => m.HostLandingModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'reservation',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./feature/reservation/reservation.module').then(m => m.ReservationModule),
        title: '::Guest:Title:reservation',
      },
      {
        path: '',
        loadChildren: () => import('./feature/landing/landing.module').then(m => m.LandingModule),
      },
      {
        path: 'explore',
        loadChildren: () => import('./feature/explore/explore.module').then(m => m.ExploreModule),
        title: '::Guest:Title:explore',
      },
      {
        path: 'vacation-home-details/:id',
        loadComponent: () =>
          import('./feature/details-vacation-home/details-vacation-home.component').then(
            c => c.DetailsVacationHomeComponent,
          ),
        title: '::Guest:Title:vacationDetails',
      },
      {
        path: 'experience-details/:id',
        loadComponent: () =>
          import('./feature/details-experience/details-experience.component').then(
            c => c.DetailsExperienceComponent,
          ),
        title: '::Guest:Title:experienceDetails',
      },
      {
        path: 'payment',
        loadComponent: () =>
          import('./feature/payment/payment.component').then(c => c.PaymentComponent),
        title: '::Guest:Title:payment',
      },

      {
        path: 'about-hyyak',
        loadComponent: () =>
          import('./feature/about-hyyak/about-hyyak.component').then(c => c.AboutHyyakComponent),
        data: { headerTransparent: true },
        title: '::Guest:Title:about',
      },
      {
        path: 'hyyak-business',
        loadComponent: () =>
          import('./feature/hyyak-business/hyyak-business.component').then(
            c => c.HyyakBusinessComponent,
          ),
        data: { headerTransparent: true },
        title: '::Guest:Title:business',
      },
      {
        path: 'contact-us',
        loadComponent: () =>
          import('./feature/contact-us/contact-us.component').then(c => c.ContactUsComponent),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./feature/profile/profile.component').then(c => c.ProfileComponent),
        title: '::Guest:Title:profile',
      },
      {
        path: 'tourism-programs',
        loadComponent: () =>
          import('./feature/tourism-programs/tourism-programs.component').then(
            c => c.TourismProgramsComponent,
          ),
        data: { headerTransparent: true },
      },
      {
        path: 'invoice',
        loadComponent: () =>
          import('./feature/invoice/invoice.component').then(c => c.InvoiceComponent),
      },
      {
        path: 'terms-and-conditions',
        loadComponent: () =>
          import('./feature/terms-and-conditions/terms-and-conditions.component').then(
            c => c.TermsAndConditionsComponent,
          ),
        data: { headerTransparent: true },
        title: '::Guest:Title:terms',
      },
      {
        path: 'invoice/:id/:isTax',
        loadComponent: () =>
          import('./feature/reservation/components/trip-details/trip-details.component').then(
            c => c.TripDetailsComponent,
          ),
      },
      {
        path: 'faq',
        loadComponent: () =>
          import('./feature/questions-answers/questions-answers.component').then(
            c => c.QuestionsAnswersComponent,
          ),
        data: { headerTransparent: true },
        title: '::Guest:Title:questions',
      },
      {
        path: 'account',
        component: AuthLayoutComponent,
        children: [
          {
            pathMatch: 'full',
            path: 'login',
            loadComponent: () =>
              import(
                './feature/auth/screens/external-login-redirect/external-login-redirect.component'
              ).then(c => c.ExternalLoginRedirectComponent),
          },
          {
            path: 'oauth2-redirect',
            loadComponent: () =>
              import(
                './feature/auth/screens/oauth2-redirect/oauth2-redirect.component'
              ).then(c => c.Oauth2RedirectComponent),
          },
        ],
      },
    ],
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
