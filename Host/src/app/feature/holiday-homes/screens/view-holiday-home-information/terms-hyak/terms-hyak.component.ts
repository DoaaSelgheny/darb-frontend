import { Component, inject } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';
import { LocalizationService } from '@abp/ng.core';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { VacationHomeHostService } from '@proxy/vacation-homes/vacation-home-host.service';
import { ExperienceHostService } from '@proxy/experiences/experience-host.service';

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
  isVaction=false;
  isExperience=false;
  id;
  commissionPercentage;
  constructor(private localizationService: LocalizationService,
    private vacationHomeHostService:VacationHomeHostService,
    private experienceHostService:ExperienceHostService
  ){
    this.data = this.nzModalData.terms
    this.isVaction=this.nzModalData.isVaction;
    this.id=this.nzModalData.id;
    if(this.data.signingAgreementDate){

      const date = new Date(this.data.signingAgreementDate);
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const daysOfWeekAr = ["الأحد", "الأثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

      this.dayOfWeek = this.language === 'ar' ?daysOfWeekAr[date.getDay()] :daysOfWeek[date.getDay()];
    }
    if(this.isVaction){
    this.vacationHomeHostService.agreementInformationById(this.id).subscribe({
      next:next=>{
      this.commissionPercentage=next.commissionPercentage;
      }
    })}

    if(this.isExperience)
    {
      this.experienceHostService.agreementInformationById(this.id).subscribe({
        next:next=>{
        this.commissionPercentage=next.commissionPercentage;
        }
      })
    }
    }
  language = this.localizationService.currentLang;
}
