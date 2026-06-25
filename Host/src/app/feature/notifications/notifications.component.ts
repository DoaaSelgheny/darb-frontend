import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NotificationItemComponent } from './components/notification-item/notification-item.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [SharedModule, NotificationItemComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {}
