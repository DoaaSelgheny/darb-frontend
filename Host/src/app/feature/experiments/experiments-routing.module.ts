import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperimentsComponent } from './experiments.component';
import { ExperimentAddEditComponent } from './screens/experiment-add-edit/experiment-add-edit.component';
 import { ViewHolidayHomeComponent } from './screens/view-holiday-home/view-holiday-home.component';

const routes: Routes = [
  { path: '', component: ExperimentsComponent },
  { path: 'experiment-add-edit/:id', component: ExperimentAddEditComponent },
  { path: 'experiment-add-edit', component: ExperimentAddEditComponent },
 { path: 'view-experiment/:id', component: ViewHolidayHomeComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExperimentsRoutingModule {}
