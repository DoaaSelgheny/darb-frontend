import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: '', redirectTo: 'reservation-settings', pathMatch: 'full' },
      // { path: 'account-settings', loadComponent: () => import('./screens/account-settings/account-settings.component').then(c => c.AccountSettingsComponent) },
      {
        path: 'reservation-settings',
        loadComponent: () =>
          import('./screens/reservation-settings/reservation-settings.component').then(
            c => c.ReservationSettingsComponent,
          ),
      },
      //{ path: 'service-prices-settings', loadComponent: () => import('./screens/service-prices-settings/service-prices-settings.component').then(c => c.ServicePricesSettingsComponent) }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
