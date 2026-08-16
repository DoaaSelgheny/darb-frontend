import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/shared/layout/layout.component';
import { PageNotFoundComponent } from 'src/shared/page-not-found/page-not-found.component';
import { YproductsComponent } from './feature/ydevproject/yproducts/yproducts.component';
import { AuthGuard } from './src/shared/auth/auth.guard';

const routes: Routes = [
  {
    path: 'account',
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
          import('./feature/auth/screens/oauth2-redirect/oauth2-redirect.component').then(
            c => c.Oauth2RedirectComponent,
          ),
      },
    ],
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'Full/yproducts', component: YproductsComponent, pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./feature/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'marketing-tools',
        loadChildren: () =>
          import('./feature/marketing-tools/marketing-tools.module').then(
            m => m.MarketingToolsModule,
          ),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./feature/profile/profile.component').then(c => c.ProfileComponent),
      },
      {
        path: 'yproducts',
        loadComponent: () =>
          import('./feature/ydevproject/yproducts/yproducts.component').then(
            c => c.YproductsComponent,
          ),
      },
      {
        path: 'holiday-homes',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./feature/holiday-homes/holiday-homes.module').then(m => m.HolidayHomesModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./feature/settings/settings.module').then(m => m.SettingsModule),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./feature/notifications/notifications.component').then(
            c => c.NotificationsComponent,
          ),
      },
      {
        path: 'account-verification',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./feature/account-verification/account-verification.component').then(
            c => c.AccountVerificationComponent,
          ),
      },
      {
        path: 'experiments',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./feature/experiments/experiments.module').then(m => m.ExperimentsModule),
      },
      {
        path: 'reservations',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./feature/reservations/reservations.component').then(
            c => c.ReservationsComponent,
          ),
      },
      {
        path: 'reservation-details/:id/:type/:isTransaction',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import(
            './feature/reservations/screens/reservation-details/reservation-details.component'
          ).then(c => c.ReservationDetailsComponent),
      },
      {
        path: 'invoice/:id/:isTax',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./feature/reservations/components/trip-details/trip-details.component').then(
            c => c.TripDetailsComponent,
          ),
      },
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import('./feature/privacy-policy/privacy-policy.component').then(
            c => c.PrivacyPolicyComponent,
          ),
      },
      {
        path: 'questions-answers',
        loadComponent: () =>
          import('./feature/questions-answers/questions-answers.component').then(
            c => c.QuestionsAnswersComponent,
          ),
      },
      {
        path: 'terms-and-conditions',
        loadComponent: () =>
          import('./feature/terms-and-conditions/terms-and-conditions.component').then(
            c => c.TermsAndConditionsComponent,
          ),
      },
      {
        path: 'financial-transactions',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./feature/financial-transactions/financial-transactions.component').then(
            c => c.FinancialTransactionsComponent,
          ),
      },
      {
        path: 'host-wallets',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./feature/host-wallets/host-wallets.component').then(
            c => c.HostWalletsComponent,
          ),
      },
      {
        path: 'rating',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./feature/rating/rating.component').then(c => c.RatingComponent),
      },
      {
        path: 'rating-details/:id',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./feature/rating/component/rating-details/rating-details.component').then(
            c => c.RatingDetailsComponent,
          ),
      },

      {
        path: 'contact-us',
        loadComponent: () =>
          import('./feature/contact-us/contact-us.component').then(c => c.ContactUsComponent),
      },
      {
        path: 'calendar',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./feature/calendar/calendar.component').then(c => c.CalendarComponent),
      },
      {
        path: 'calendar-details/:id',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('../shared/ui-components/full-calender/full-calender.component').then(
            c => c.FullCalenderComponent,
          ),
      },
      { path: '**', component: PageNotFoundComponent },
    ],
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
