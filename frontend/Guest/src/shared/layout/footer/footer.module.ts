import { CoreModule } from "@abp/ng.core";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NzIconModule } from "ng-zorro-antd/icon";
import { UiComponentsModule } from "src/shared/ui-components/ui-components.module";
import { FooterComponent } from "./footer.component";

@NgModule({
    declarations: [FooterComponent],
    imports: [CommonModule, RouterModule, NzIconModule, UiComponentsModule, CoreModule],
    exports:[FooterComponent]
  })
  export class FooterModule {}