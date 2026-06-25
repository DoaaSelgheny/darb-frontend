import { LocalizationService, SessionStateService } from '@abp/ng.core';
import { ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrl: './select-language.component.scss',
})
export class SelectLanguageComponent {
  @Input() classes = '';
  selectLang: string = this.sessionState.getLanguage() || 'ar';

  constructor(
    private sessionState: SessionStateService,
    private cdr: ChangeDetectorRef,
  ) {}

// changeLang(lang: string) {
//   setTimeout(() => {
//     this.selectLang = lang;
//     this.sessionState.setLanguage(lang);
//     this.cdr.detectChanges();

//     // ✅ تغيير الاتجاه بناءً على اللغة
//     if (lang === 'ar') {
//       document.documentElement.lang = 'ar';
//       document.body.dir = 'rtl';
//     } else {
//       document.documentElement.lang = 'en';
//       document.body.dir = 'ltr';
//     }

//     // ✅ إزالة &lang من الرابط ثم إعادة التوجيه
//     const currentUrl = window.location.href;
//     const langIndex = currentUrl.indexOf('&lang=');
//     const reloadedLocation =
//       langIndex !== -1 ? currentUrl.substring(0, langIndex) : currentUrl;

//     window.location.href = reloadedLocation;
//   }, 1000);
// }
changeLang(lang: string) {
  setTimeout(() => {
    this.selectLang = lang;

    this.sessionState.setLanguage(lang);
    this.cdr.detectChanges();

    const culture = lang === 'ar' ? 'ar-EG' : 'en-US';

    const expireDate = new Date();
    expireDate.setFullYear(expireDate.getFullYear() + 1);
    document.cookie = `.AspNetCore.Culture=c=${culture}|uic=${culture};expires=${expireDate.toUTCString()};path=/`;


    document.documentElement.lang = lang;
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';

  
    const currentUrl = window.location.href;
    const langIndex = currentUrl.indexOf('&lang=');
    const reloadedLocation =
      langIndex !== -1 ? currentUrl.substring(0, langIndex) : currentUrl;

    window.location.href = reloadedLocation;
  }, 500);
}
}
