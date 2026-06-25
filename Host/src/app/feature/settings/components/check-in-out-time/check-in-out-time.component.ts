import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'app-check-in-out-time',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './check-in-out-time.component.html',
  styleUrl: './check-in-out-time.component.scss',
})
export class CheckInOutTimeComponent {
  timeToEnter: Date;
  timeToLeave: Date;
  constructor() {
    this.timeToEnter = new Date();
    this.timeToEnter.setHours(12);
    this.timeToEnter.setMinutes(0);

    this.timeToLeave = new Date();
    this.timeToLeave.setHours(11);
    this.timeToLeave.setMinutes(30);
  }

  saveChanges() {
    const timeToEnteString = this.timeToEnter.getHours() + '-' + this.timeToEnter.getMinutes();
    const timeToLeaveString = this.timeToLeave.getHours() + '-' + this.timeToLeave.getMinutes();
  }
}
