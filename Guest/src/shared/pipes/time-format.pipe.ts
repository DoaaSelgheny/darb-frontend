import { SessionStateService } from '@abp/ng.core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true, // Standalone component
})
export class TimeFormatPipe implements PipeTransform {
  constructor(      private sessionState:SessionStateService,
  ){}
  lang = this.sessionState.getLanguage();

  transform(value: string): string {
    // Split the time string into hours, minutes, and seconds
    const [hours, minutes, seconds] = value.split(':').map(Number);

    // Validate the time components
    if (hours == null || minutes == null || seconds == null || hours > 23 || minutes > 59 || seconds > 59) {
      throw new Error('Invalid time format');
    }

    // Determine AM/PM and convert hours to 12-hour format
    const period = hours >= 12 ? this.lang=== 'ar'?'م':'PM' : this.lang=== 'ar'?'ص':'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

    // Return formatted time in "hh:mm AM/PM" format
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
}
