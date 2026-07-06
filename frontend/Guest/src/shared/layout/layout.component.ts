import { LocalizationService, SessionStateService } from '@abp/ng.core';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  sectionToScroll = signal<string | null>(null);
    lang = this.sessionState.getLanguage();

  constructor(
    private sessionState: SessionStateService,

  ) {}
  getSection(sectionId: string){
    const element = document.querySelector('#' + sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

  }
}
