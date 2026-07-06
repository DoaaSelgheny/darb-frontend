import { AuthService, CoreModule, SessionStateService } from '@abp/ng.core';
import { GdprConfigModule } from '@volo/abp.ng.gdpr/config';
import { SettingManagementConfigModule } from '@abp/ng.setting-management/config';
import { HTTP_ERROR_HANDLER, ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommercialUiConfigModule } from '@volo/abp.commercial.ng.ui/config';
import { AccountPublicConfigModule } from '@volo/abp.ng.account/public/config';
import { AuditLoggingConfigModule } from '@volo/abp.ng.audit-logging/config';
import { IdentityConfigModule } from '@volo/abp.ng.identity/config';
import { LanguageManagementConfigModule } from '@volo/abp.ng.language-management/config';
import { registerLocale } from '@volo/abp.ng.language-management/locale';
import { SaasConfigModule } from '@volo/abp.ng.saas/config';
import { TextTemplateManagementConfigModule } from '@volo/abp.ng.text-template-management/config';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { OpeniddictproConfigModule } from '@volo/abp.ng.openiddictpro/config';
import { FeatureManagementModule } from '@abp/ng.feature-management';
import { AbpOAuthModule } from '@abp/ng.oauth';
import { ThemeBasicModule } from '@abp/ng.theme.basic';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ar_EG } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import ar from '@angular/common/locales/ar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from 'src/shared/layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { LandingRoutingModule } from './feature/landing/landing-routing.module';
import { ExploreRoutingModule } from './feature/explore/explore-routing.module';
import { ExploreModule } from './feature/explore/explore.module';
import { handleHttpErrors } from './http-error.interceptor';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerModule } from 'ngx-spinner';

import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  NgxUiLoaderRouterModule,
  NgxUiLoaderHttpModule,
} from 'ngx-ui-loader';
import { CustomPageTitleStrategy } from 'src/shared/dynamic-search/custom-page-title-strategy';
import { TitleStrategy } from '@angular/router';
registerLocaleData(ar);
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#0c1c61',
  bgsOpacity: 0.4,
  bgsPosition: 'bottom-center',
  bgsSize: 60,
  bgsType: 'folding-cube',
  blur: 3,
  delay: 0,
  fgsColor: 'rgba(12,28,97,0.83)',
  fgsPosition: 'center-center',
  fgsSize: 26,
  //fgsType: 'rectangle-bounce-party',
  fgsType: 'wandering-cubes',
  //fgsType: 'ball-spin-clockwise',
  //ball-spin-clockwise
  gap: -1,
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(12,28,97,0.41)',
  pbColor: 'rgba(12,28,97,0.69)',
  pbDirection: 'ltr',
  pbThickness: 6,
  hasProgressBar: true,
  text: '',
  textColor: '#ffffff',
  textPosition: 'center-center',
  minTime: 300,
  logoUrl: '../assets/imgs/hlogoloading.svg',
  logoPosition: 'center-center',
  fastFadeOut: true,
  logoSize: 90,
  maxTime: 26,
  //bgsColor: '#263aa6',
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    NgxSpinnerModule,
    NgxUiLoaderModule, // import NgxUiLoaderModule
    NgxUiLoaderRouterModule, // import NgxUiLoaderRouterModule. By default, it will show the foreground loader
    // If you need to show the foreground spinner, do as follows:
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    // Import NgxUiLoaderModule with custom configuration globally
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule.forRoot({
      environment,
      registerLocaleFn: registerLocale(),
    }),
    AbpOAuthModule.forRoot(),
    ThemeSharedModule.forRoot(),
    AccountPublicConfigModule.forRoot(),
    IdentityConfigModule.forRoot(),
    LanguageManagementConfigModule.forRoot(),
    SaasConfigModule.forRoot(),
    AuditLoggingConfigModule.forRoot(),
    OpeniddictproConfigModule.forRoot(),
    TextTemplateManagementConfigModule.forRoot(),
    SettingManagementConfigModule.forRoot(),

    CommercialUiConfigModule.forRoot(),
    FeatureManagementModule.forRoot(),
    GdprConfigModule.forRoot({
      privacyPolicyUrl: 'gdpr-cookie-consent/privacy',
      cookiePolicyUrl: 'gdpr-cookie-consent/cookie',
    }),
    ThemeBasicModule.forRoot(),
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000',
    // }),
    FormsModule,
    HttpClientModule,
    LayoutModule,
    ExploreModule,
    CommonModule,
    LandingRoutingModule,
    ExploreRoutingModule,
    ReactiveFormsModule,
    // CarouselModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: ar_EG },
    { provide: HTTP_ERROR_HANDLER, useValue: handleHttpErrors },
    { provide: TitleStrategy, useClass: CustomPageTitleStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private sessionState: SessionStateService,
    private authService: AuthService,
  ) {
    let queryLang = new URLSearchParams(window.location.search).get('lang');
    if (queryLang) {
      this.sessionState.setLanguage(queryLang);
      return;
    }
    (async () => {
      const storedLang = this.sessionState.getLanguage();
      if (storedLang) {
        return;
      }

      let lang = 'en';
      let response = await fetch(
        'https://api.ipdata.co?api-key=9a2e8e374719020660f8952ae6f8a24896149b3e52de8a026eda5e8f',
      );
      let res = await response.json();
      const countryCode = res.country_code;
      if (
        [
          'EG',
          'SA',
          'QA',
          'AE',
          'BH',
          'MA',
          'TN',
          'LY',
          'LB',
          'OM',
          'DZ',
          'IQ',
          'JO',
          'KM',
          'KW',
          'PS',
          'SD',
          'SO',
          'SY',
          'YE',
        ].includes(countryCode)
      ) {
        lang = 'ar';
      } else {
        lang = 'en';
      }

      this.sessionState.setLanguage(lang);
    })();
  }
}
