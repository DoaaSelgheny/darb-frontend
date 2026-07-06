import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ExperimentsComponent } from './experiments.component';
import { SharedModule } from '../../../shared/shared.module';
import { ExperimentsRoutingModule } from './experiments-routing.module';
import { ExperimentsItemComponent } from './components/experiment-item/experiment-item.component';
import { ExperimentAddEditComponent } from './screens/experiment-add-edit/experiment-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExperimentDataComponent } from './screens/experiment-data/experiment-data.component';
import { ExperimentBookingDetailsComponent } from './screens/experiment-booking-details/experiment-booking-details.component';
import { ExperimentDescriptionComponent } from './screens/experiment-description/experiment-description.component';
import { ExperimentLocationComponent } from './screens/experiment-location/experiment-location.component';
import { ExperimentMeansIncludedComponent } from './screens/experiment-means-included/experiment-means-included.component';
import { ExperimentPhotosComponent } from './screens/experiment-photos/experiment-photos.component';
import { ExperimentPriceComponent } from './screens/experiment-price/experiment-price.component';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { AvailabilityComponent } from './screens/availability/availability.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { DescriptionHolidayHomeComponent } from './screens/description-holiday-home/description-holiday-home.component';
import { HolidayHomePhotosComponent } from './screens/holiday-home-photos/holiday-home-photos.component';
import { PriceDataComponent } from './screens/price-data/price-data.component';
import { ViewHolidayHomeInformationComponent } from './screens/view-holiday-home-information/view-holiday-home-information.component';
import { InfoItemComponent } from './screens/view-holiday-home-information/info-item/info-item.component';
import { AmenityCardComponent } from './screens/view-holiday-home-information/amenity-card/amenity-card.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
@NgModule({
  declarations: [
    ExperimentsComponent,
    ExperimentsItemComponent,
    ExperimentAddEditComponent,
    ExperimentDataComponent,
    ExperimentBookingDetailsComponent,
    ExperimentDescriptionComponent,
    ExperimentLocationComponent,
    ExperimentMeansIncludedComponent,
    ExperimentPhotosComponent,
    ExperimentPriceComponent,
    AvailabilityComponent,
    DescriptionHolidayHomeComponent,
    HolidayHomePhotosComponent,
    PriceDataComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ExperimentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    NzFormModule,
    NzStepsModule,
     NgxMaterialTimepickerModule,
    NzCollapseModule,
    InfoItemComponent, AmenityCardComponent,  GoogleMap,
    ViewHolidayHomeInformationComponent
  ],  providers: [DatePipe],
})
export class ExperimentsModule {
  constructor() {}
}
