import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExploreVacationHomeComponent } from './screens/explore-vacation-home/explore-vacation-home.component';
import { VacationHomeItemComponent } from './components/vacation-home-item/vacation-home-item.component';
import { ExploreRoutingModule } from './explore-routing.module';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import { CoreModule } from '@abp/ng.core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

@NgModule({
  declarations: [
    ExploreVacationHomeComponent,
  ],
  imports: [
    CommonModule,
    ExploreRoutingModule,
    UiComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    NzCarouselModule,
    VacationHomeItemComponent
  ],
})
export class ExploreModule {}
