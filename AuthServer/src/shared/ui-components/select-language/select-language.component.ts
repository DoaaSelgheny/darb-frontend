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

  changeLang(lang) {
    setTimeout(() => {
      this.selectLang = lang;
    this.sessionState.setLanguage(lang);
    this.cdr.detectChanges();
    let reloadedLocation = window.location.href.substring(
      0,
      window.location.href.indexOf('&lang='),
    );

    window.location.href = reloadedLocation || window.location.href;  
    }, 1000);
      //window.location.reload();
  }
}
