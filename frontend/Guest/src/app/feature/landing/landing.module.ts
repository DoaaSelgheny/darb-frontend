import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import { FilterComponent } from './components/filter/filter.component';
import { ExploreSectionComponent } from './components/explore-section/explore-section.component';
import { ActivitiesSectionComponent } from './components/activities-section/activities-section.component';
import { DestinationsComponent } from './components/destinations/destinations.component';
import { FeaturedDestinationsComponent } from './components/featured-destinations/featured-destinations.component';
import { HostWithUsComponent } from './components/host-with-us/host-with-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@abp/ng.core';
import { DefaultImgDirective } from 'src/assets/imgs/default-img.directive';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { SharedModule } from 'src/shared/shared.module';
import { AppearOnScrollDirective } from 'src/shared/directives/appear-on-scroll.directive';
@NgModule({
  declarations: [
    LandingComponent,
    FilterComponent,
    ExploreSectionComponent,
    ActivitiesSectionComponent,
    DestinationsComponent,
    FeaturedDestinationsComponent,
    HostWithUsComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    UiComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    DefaultImgDirective,
    NzCarouselModule,
    SharedModule,
    AppearOnScrollDirective,
],
})
export class LandingModule {}
