import { Component, Input, OnInit } from '@angular/core';
import { RatingsGuestService, ReviewDto, ServiceType } from '@proxy/ratings';
import { ServiceAverageRatingsResponseDto } from '@proxy/ratings/guest';
import { GetVacationHomeDetailsForGuestResponseDto } from '@proxy/vacation-homes';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import { ChatModelComponent } from './chat-model/chat-model.component';

@Component({
  selector: 'app-rating-details',
  standalone: true,
  imports: [UiComponentsModule,NzProgressModule,ChatModelComponent ],
  templateUrl: './rating-details.component.html',
  styleUrl: './rating-details.component.scss'
})
export class RatingDetailsComponent implements OnInit {
  @Input() id :number;
  @Input() ratingAverage :number;
  @Input() isVacation:boolean
  ServiceTypeEnum =ServiceType
  rating : ServiceAverageRatingsResponseDto =null
  serviceType:number
  totalCount:number=0
  page:number=1
  itemsPerPage:number=4
  reviews:ReviewDto[]=[]
  formatData = (percent: number): string => `${(percent/10).toFixed(1)}`;

  constructor(private ratingservice:RatingsGuestService) {}
  ngOnInit(): void {
    this.getRating()
    this.getReviews(this.page)
  }
  getRating(){
    console.log(this.id)
    this.serviceType = this.isVacation ? this.ServiceTypeEnum.VacationHome : this.ServiceTypeEnum.Experience
    this.ratingservice.getAverageRatingsByServiceIdAndServiceType(this.id,this.serviceType).subscribe(rating=>{
      this.rating = rating
    })
  }
  getReviews(pageIndex:number){
    this.page = pageIndex
    let params = {
      serviceId: this.id,
      serviceType: this.serviceType,
      maxResultCount: this.itemsPerPage,
      skipCount: (this.page - 1) * this.itemsPerPage,
    }
    this.ratingservice.getReviewsByReqParams(params).subscribe(reviews=>{
      this.reviews = reviews.items;         
      this.totalCount = reviews.totalCount;

    })
  }
}
