import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolidayHomesComponent } from './holiday-homes.component';
import { AddEditHolidayHomeComponent } from './screens/add-edit-holiday-home/add-edit-holiday-home.component';
import { ViewHolidayHomeComponent } from './screens/view-holiday-home/view-holiday-home.component';

const routes: Routes = [
  { path: '', component: HolidayHomesComponent },
  { path: 'add-edit-holiday-home/:id', component: AddEditHolidayHomeComponent },
  { path: 'add-edit-holiday-home', component: AddEditHolidayHomeComponent },
  { path: 'view-holiday-home/:id', component: ViewHolidayHomeComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HolidayHomesRoutingModule {}
