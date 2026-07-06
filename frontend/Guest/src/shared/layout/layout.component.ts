import { LocalizationService, SessionStateService } from '@abp/ng.core';
import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  sectionToScroll = signal<string | null>(null);
  showScrollToTop = signal(false);
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

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showScrollToTop.set(window.scrollY > 400);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
