import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MenuComponent } from './menu/menu.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { FooterComponent } from './footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
  NgxUiLoaderHttpModule,
  NgxUiLoaderConfig,
} from 'ngx-ui-loader';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#0c1c61',
  bgsOpacity: 0.4,
  bgsPosition: 'bottom-center',
  bgsSize: 60,
  bgsType: 'folding-cube',
  blur: 3,
  delay: 0,
  fastFadeOut: true,
  fgsColor: 'rgba(12,28,97,0.83)',
  fgsPosition: 'center-center',
  fgsSize: 70,
  fgsType: 'cube-grid',
  gap: 32,
  logoPosition: 'bottom-center',
  logoSize: 52,
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(12,28,97,0.41)',
  pbColor: 'rgba(12,28,97,0.69)',
  pbDirection: 'ltr',
  pbThickness: 6,
  hasProgressBar: true,
  text: ' ...',
  textColor: '#ffffff',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300,
  //bgsColor: '#263aa6',
};
@NgModule({
  declarations: [MenuComponent, LayoutComponent, FooterComponent],
  imports: [
    NgxSpinnerModule,
    NgxUiLoaderModule, // import NgxUiLoaderModule
    NgxUiLoaderRouterModule, // import NgxUiLoaderRouterModule. By default, it will show the foreground loader
    // If you need to show the foreground spinner, do as follows:
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    // Import NgxUiLoaderModule with custom configuration globally
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    UiComponentsModule,
    HeaderComponent,

  ],
})
export class LayoutModule {}
