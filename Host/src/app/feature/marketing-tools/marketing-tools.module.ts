import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { CouponEditComponent } from './screens/coupon-edit/coupon-edit.component';
import { CouponTableComponent } from './screens/coupon-table/coupon-table.component';
import { MarketingToolsRoutingModule } from './marketing-tools-routing.module';
import { MarketingToolsComponent } from './marketing-tools.component';
import { MarketingCardComponent } from './components/marketing-card/marketing-card.component';

@NgModule({
  imports: [CommonModule, SharedModule, MarketingToolsRoutingModule],
  declarations: [
    MarketingToolsComponent,
    CouponEditComponent,
    CouponTableComponent,
    MarketingCardComponent,
  ],
})
export class MarketingToolsModule {}
