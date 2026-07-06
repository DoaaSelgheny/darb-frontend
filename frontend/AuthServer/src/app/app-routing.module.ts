import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from 'src/shared/page-not-found/page-not-found.component';
import { GuestRoutes } from 'src/app/feature/screens/guest/guest.routes';
import { HostRoutes } from 'src/app/feature/screens/host/host.routes';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    canActivate:[AuthGuard],
    children: [...GuestRoutes],
  },
  {
    path: 'host',
     canActivate:[AuthGuard],
    children: [...HostRoutes],
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
