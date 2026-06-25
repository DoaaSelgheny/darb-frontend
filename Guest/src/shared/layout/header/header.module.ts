import { CoreModule } from "@abp/ng.core";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NzIconModule } from "ng-zorro-antd/icon";
import { UiComponentsModule } from "src/shared/ui-components/ui-components.module";
import { HeaderComponent } from "./header.component";
import { MenuModule } from "../menu/menu.module";

@NgModule({
    declarations: [HeaderComponent],
    imports: [CommonModule, RouterModule, NzIconModule, UiComponentsModule,MenuModule],
    exports:[HeaderComponent]
  })
  export class HeaderModule {}