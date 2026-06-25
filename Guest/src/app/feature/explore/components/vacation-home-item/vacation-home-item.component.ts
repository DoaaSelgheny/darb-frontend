
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceType, ExperienceDatesType, ReceptionTimeType } from '@proxy/experiences';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-vacation-home-item',
  templateUrl: './vacation-home-item.component.html',
  styleUrl: './vacation-home-item.component.scss',
  standalone:true,
  imports:[UiComponentsModule,NzCarouselModule]
})
export class VacationHomeItemComponent implements OnInit {
  @Input() isVacationHome: boolean = true;
  @Input() similar: boolean = false;
  @Input() averagePrice:number
  @Input() item = null;
  @Input() city :string;
  @Input() district:string
  @Input() ratingsAverage:number
  @Input() ratingsCount:number

  dateFrom;
  dateTo;
  effect = 'scrollx';
  queryParams ={}
  attendanceTypeEnum = AttendanceType;
  receptionTimeTypeEnum = ReceptionTimeType;
  experienceDatesTypeEnum=ExperienceDatesType;
  similarImages =[]
  datesType:number
  attendType:number
  constructor(private route: ActivatedRoute,
  private router:Router) {
    const _dateFrom = this.route.snapshot.params['dateFrom'];
    const _dateTo = this.route.snapshot.params['dateTo'];
    if (_dateFrom) {
      this.dateFrom = _dateFrom;
      this.queryParams['dateFrom'] =this.dateFrom
    }
    if (_dateTo){
      this.dateTo = _dateTo;
      this.queryParams['dateTo'] =this.dateTo
    } 
    
  }

  ngOnInit(): void {
    
    if(this.similar){
      this.similarImages = this.isVacationHome ?this.item.vacationHomeImages : this.item.experienceImages
    }
    if(!this.isVacationHome){
      this.datesType = this.similar ? this.item.experienceDatesType : this.item?.datesType
      this.attendType = this.similar ? this.item.attendanceType : this.item.attendanceType

    }
    
  }
  goToDetails(){
    if(this.isVacationHome){
      if(this.dateFrom && this.dateTo){
    
        this.router.navigateByUrl(`/explore`, { skipLocationChange: true }).then(() => {
          this.router.navigate(['/vacation-home-details', this.item.id,this.queryParams]);
        });
      }else{
 
        this.router.navigateByUrl(`/explore`, { skipLocationChange: true }).then(() => {
          this.router.navigate(['/vacation-home-details', this.item.id]);
        });
      }
    }else{
      if(this.dateFrom && this.dateTo){
        this.router.navigateByUrl(`/explore`, { skipLocationChange: true }).then(() => {
          this.router.navigate(['/experience-details', this.item.id,this.queryParams]);
        });
      }else{
        this.router.navigateByUrl(`/explore}`, { skipLocationChange: true }).then(() => {
          this.router.navigate(['/experience-details', this.item.id]);
        });
      }
    }
  }  
}
