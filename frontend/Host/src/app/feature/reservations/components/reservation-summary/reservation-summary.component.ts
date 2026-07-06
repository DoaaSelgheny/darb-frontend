import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { LocalizationService } from '@abp/ng.core';

@Component({
  selector: 'app-reservation-summary',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './reservation-summary.component.html',
  styleUrl: './reservation-summary.component.scss',
})
export class ReservationSummaryComponent implements OnInit{
  @Input() data: any;
  @Input() isVaction=false;
  lang: any;
      constructor(
        private localizationService: LocalizationService,

      ) {}


    ngOnInit(): void {
      this.lang = this.localizationService.currentLang;}
  formatTime(time: string): string {
    if(time){
    const [hours, minutes] = time.split(':'); // Split the string
    return `${hours}:${minutes}`; // Return only hours and minutes
    }
    else{
      return;
    }

  }
}
