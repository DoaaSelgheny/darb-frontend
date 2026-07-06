import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { HolidayHomesItemComponent } from './components/holiday-homes-item/holiday-homes-item.component';
import { HolidayHomesComponent } from './holiday-homes.component';
import { RouterModule, Routes } from '@angular/router';
import { HolidayHomesRoutingModule } from './holiday-homes-routing.module';
import { AddEditHolidayHomeComponent } from './screens/add-edit-holiday-home/add-edit-holiday-home.component';
import { RoomDataComponent } from './screens/room-data/room-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeDataComponent } from './screens/home-data/home-data.component';
import { DescriptionHolidayHomeComponent } from './screens/description-holiday-home/description-holiday-home.component';
import { HomePolicyComponent } from './screens/home-police/home-policy.component';
import { HolidayHomePhotosComponent } from './screens/holiday-home-photos/holiday-home-photos.component';
import { HomeLocationComponent } from './screens/home-location/home-location.component';
import { PriceDataComponent } from './screens/price-data/price-data.component';
import { SummaryComponent } from './screens/summary/summary.component';

import { GoogleMapsModule } from '@angular/google-maps';
import { AvailabilityComponent } from './screens/availability/availability.component';
import { HomeFacilitiesComponent } from './screens/home-facilities/home-facilities.component';
import { UserAgreementComponent } from './screens/user-agreement/user-agreement.component';
import { ViewHolidayHomeInformationComponent } from './screens/view-holiday-home-information/view-holiday-home-information.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzImageModule } from 'ng-zorro-antd/image';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
@NgModule({
  declarations: [
    HolidayHomesItemComponent,
    HolidayHomesComponent,
    AddEditHolidayHomeComponent,
    HomeFacilitiesComponent,
    RoomDataComponent,
    DescriptionHolidayHomeComponent,
    SummaryComponent,
    PriceDataComponent,
    HolidayHomePhotosComponent,
    HomePolicyComponent,
        HomeDataComponent,
    HomeLocationComponent,
    AvailabilityComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HolidayHomesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    UserAgreementComponent,
    NgxMaterialTimepickerModule,
    ViewHolidayHomeInformationComponent,
    NzFormModule,
    NzStepsModule,
    NzCollapseModule,
    NzImageModule
  ],
})
export class HolidayHomesModule {}
