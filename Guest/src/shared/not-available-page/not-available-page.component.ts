import { Component } from '@angular/core';
import { UiComponentsModule } from '../ui-components/ui-components.module';

@Component({
  selector: 'app-not-available-page',
  standalone: true,
  imports: [UiComponentsModule],
  templateUrl: './not-available-page.component.html',
  styleUrl: './not-available-page.component.scss'
})
export class NotAvailablePageComponent {

}
