import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { LocalizationService } from '@abp/ng.core';

@Component({
  selector: 'app-trip-data',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './trip-data.component.html',
  styleUrl: './trip-data.component.scss',
})
export class TripDataComponent  implements OnInit {
  @Input() data: any;
  @Input() isVaction=false;
  copied=false;
  lang: any;
    constructor(
      private localizationService: LocalizationService,

    ) {}


  ngOnInit(): void {
    this.lang = this.localizationService.currentLang;}
  copyToClipboard(number:any)
  {
    navigator.clipboard.writeText(number).then(
      () => {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000); // Reset after 2 seconds
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  }
}
