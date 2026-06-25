import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation.component';
import { RouterModule, Routes } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import { TimeFormatPipe } from 'src/shared/pipes/time-format.pipe';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReservationItemComponent } from './components/reservation-item/reservation-item.component';
import { ReservationDetailsComponent } from './screens/reservation-details/reservation-details.component';

const routes: Routes = [
  { path: '', component: ReservationComponent },
  {
    path:':id',
    component:ReservationDetailsComponent,
    title:'::Guest:Title:reserveDetails',
    
  }
];

@NgModule({
  declarations: [
    ReservationComponent,
  ],
  imports: [CommonModule,
     RouterModule.forChild(routes),
      NzBreadCrumbModule,
       UiComponentsModule,
       TimeFormatPipe,
      NzIconModule,
    ReservationItemComponent],
})
export class ReservationModule {}
