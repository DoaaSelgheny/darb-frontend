import { CoreModule } from '@abp/ng.core';
import { Component } from '@angular/core';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-cover-section',
  standalone: true,
  imports: [UiComponentsModule, CoreModule],
  templateUrl: './cover-section.component.html',
  styleUrl: './cover-section.component.scss',
})
export class CoverSectionComponent {
  constructor() {}
  ngOnInit(): void {}

  scrollToComponent() {
    setTimeout(() => {
      const targetElement = document.getElementById('contactUs');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      } else {
      }
    }, 0);
  }
}
