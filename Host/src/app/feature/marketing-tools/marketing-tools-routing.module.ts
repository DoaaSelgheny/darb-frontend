import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketingToolsComponent } from './marketing-tools.component';
import { CouponEditComponent } from './screens/coupon-edit/coupon-edit.component';
import { CouponTableComponent } from './screens/coupon-table/coupon-table.component';

const routes: Routes = [
  { path: '', component: MarketingToolsComponent },
  { path: 'coupons', component: CouponTableComponent },
  { path: 'coupons/add-edit/:serviceType', component: CouponEditComponent },
  { path: 'coupons/add-edit/:serviceType/:serviceId/:couponId', component: CouponEditComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketingToolsRoutingModule {}
