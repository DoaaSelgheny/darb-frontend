import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { CoreModule } from '@abp/ng.core';
import { HeaderModule } from './header/header.module';
import { MenuModule } from './menu/menu.module';
import { FooterModule } from './footer/footer.module';

@NgModule({
  declarations: [ LayoutComponent],
  imports: [CommonModule, RouterModule, NzIconModule, UiComponentsModule, CoreModule,
    HeaderModule,MenuModule,FooterModule
  ],
})
export class LayoutModule {}
