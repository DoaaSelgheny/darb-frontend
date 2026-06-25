import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreVacationHomeComponent } from './screens/explore-vacation-home/explore-vacation-home.component';

const routes: Routes = [
  { path: '', component: ExploreVacationHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreRoutingModule {}
