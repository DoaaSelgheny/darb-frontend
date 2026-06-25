import { LocalizationService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { ExperienceGuestService, ExperienceWithNavigationPropertiesDto } from '@proxy/experiences';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.scss',
})
export class DestinationsComponent{
    lang = this.localizationService.currentLang;
  constructor( private localizationService: LocalizationService,) {}
openApp(app:string){
  if(app == 'android'){
    window.open('https://play.google.com/store/apps/details?id=com.hyyak.app','_blank')
  }else{

    window.open('https://apps.apple.com/ae/app/%D8%AD%D9%8A-%D8%A7%D9%83-hyyak/id1670008657','_blank')
  }
}
}
