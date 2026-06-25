import { LocalizationService } from '@abp/ng.core';
import { Component, inject } from '@angular/core';
import { ExperienceHostService } from '@proxy/experiences/experience-host.service';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { SharedModule } from 'src/shared/shared.module';

@Component({
  selector: 'app-terms-hyak',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './terms-hyak.component.html',
  styleUrl: './terms-hyak.component.scss'
})
export class TermsHyakComponent {
  readonly #modal = inject(NzModalRef);
  readonly nzModalData = inject(NZ_MODAL_DATA);
  data:any
  dayOfWeek;
  id;
  commissionPercentage;
  isExperience=false;
  constructor(private localizationService: LocalizationService,
     private experienceHostService:ExperienceHostService
  ){
    this.data = this.nzModalData.terms
    this.isExperience=this.nzModalData.isExperience;
    this.id=this.nzModalData.id;
    this.experienceHostService.agreementInformationById(this.id).subscribe({
      next:next=>{
      this.commissionPercentage=next.commissionPercentage;
      }
    })

    if(this.data?.signingAgreementDate){

      const date = new Date(this.data.signingAgreementDate);
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const daysOfWeekAr = ["الأحد", "الأثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

      this.dayOfWeek = this.language === 'ar' ?daysOfWeekAr[date.getDay()] :daysOfWeek[date.getDay()];
    }




    }
  language = this.localizationService.currentLang;
}
