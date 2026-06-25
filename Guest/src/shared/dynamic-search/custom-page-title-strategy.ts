import { Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LocalizationService } from '@abp/ng.core';

@Injectable()
export class CustomPageTitleStrategy extends TitleStrategy {
  constructor(
        private localizationService: LocalizationService,
     private readonly title: Title) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {

    const title = this.buildTitle(snapshot);
    if (title) {
      // this.translateService.get(title).subscribe(translatedTitle => {
      //   this.title.setTitle(`${localStorage.getItem('associationName')}|${translatedTitle}`);
      // });
      this.localizationService.get(title).subscribe(translatedTitle => {
        this.title.setTitle(`${translatedTitle}`);

      })
    } else {
      this.title.setTitle('Hayak');
    }
  }
}
