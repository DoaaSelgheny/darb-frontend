
import { LocalizationService, SessionStateService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  /**
   *
   */
  isOpenMenu: boolean = false;

 // lang = this.sessionStateService.getLanguage();
 lang=this.localizationService.currentLang;
  constructor(
    public ngxUiLoader: NgxUiLoaderService,
    public localizationService:LocalizationService,
    private sessionStateService: SessionStateService,
  ) {
     console.log(this.lang,"lang Elgheny");

  }
  
  
  toggleOpen(toggle: boolean) {
    this.isOpenMenu = !this.isOpenMenu;
  }
}
