import { LocalizationService } from '@abp/ng.core';
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { VisibleStatus } from '@proxy/experiences';
import { ReservationStatus, ReservationType } from '@proxy/reservation-users';
import { VacationHomePublishStatus } from '@proxy/vacation-homes';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { SharedModule } from 'src/shared/shared.module';

@Component({
  selector: 'app-slider-information',
  standalone: true,
    imports: [SharedModule,NzCarouselModule],
  templateUrl: './slider-information.component.html',
  styleUrl: './slider-information.component.scss'
})
export class SliderInformationComponent implements OnInit {
  @Input() data: any;
  @Input() isVaction: any; 
  @Input() images=[]
  effect = 'scrollx';

  lang = this.localizationService.currentLang;
  reserveType = ReservationType
  ReservationStatus=ReservationStatus
  disableDetailBtn:boolean = false
  VisibleStatus = VisibleStatus
  VacationHomePublishStatus = VacationHomePublishStatus
 
    constructor(private localizationService: LocalizationService,
      private router: Router,
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      if(this.isVaction){
        this.disableDetailBtn = this.data?.vacationHomeSummary.publishStatus === VacationHomePublishStatus.Published ? false : true
      }else{
        this.disableDetailBtn = this.data?.experienceSummary.visibleStatus === VisibleStatus.Active ? false : true
      }
    }, 1000);
  }
 
  goToDetails(){
    if(this.isVaction){
      this.router.navigate([`/vacation-home-details/${this.data?.vacationHomeSummary.id}`])
    }else{
      this.router.navigate([`/experience-details/${this.data?.experienceSummary.id}`])

    }
  }
  goToExplore(){
    if(this.isVaction){
      this.router.navigate([`/explore`,{type:1}])

    }else{
      this.router.navigate([`/explore`,{type:2}])


    }
  }
  downloadPill(){}
}
