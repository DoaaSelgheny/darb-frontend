import { CoreModule } from "@abp/ng.core";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FooterModule } from "src/shared/layout/footer/footer.module";
import { HeaderModule } from "src/shared/layout/header/header.module";
import { UiComponentsModule } from "src/shared/ui-components/ui-components.module";
import { HostLandingComponent } from "./host-landing.component";
import { MenuModule } from "src/shared/layout/menu/menu.module";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";

@NgModule({
    declarations: [HostLandingComponent],
    imports: [ 
      HeaderModule,
      MenuModule,
      FooterModule,
      UiComponentsModule,
      CoreModule,NzTabsModule,
      NzDropDownModule,
      RouterModule.forChild([
        {
          path: '',
          component: HostLandingComponent,
        },
      ]),
    ],
  })
  export class HostLandingModule {}