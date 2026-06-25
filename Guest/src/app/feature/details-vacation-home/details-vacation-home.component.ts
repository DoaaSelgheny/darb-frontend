import { Component, OnInit } from '@angular/core';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import { HeaderDetailsTripComponent } from './components/header-details-trip/header-details-trip.component';
import { PriceDetailsComponent } from './components/price-details/price-details.component';
import { CommonModule } from '@angular/common';
import { TripInfoDetailsComponent } from './components/trip-info-details/trip-info-details.component';
import { SpaceRoomsComponent } from './components/space-rooms/space-rooms.component';
import { TripFeaturesComponent } from './components/trip-features/trip-features.component';
import { PackageLocationComponent } from './components/package-location/package-location.component';
import { TripPhotosComponent } from './components/trip-photos/trip-photos.component';
import {
  GetVacationHomeDetailsForGuestResponseDto,
  VacationHomeGuestService,
} from '@proxy/vacation-homes';
import { ActivatedRoute, NavigationStart, Router, RouterModule, Event } from '@angular/router';
import { SessionStateService } from '@abp/ng.core';
import { SimilarVacationHomeComponent } from './components/similar-home/similar-home.component';
import { RatingDetailsComponent } from '../rating-details/rating-details.component';

@Component({
  selector: 'app-details-vacation-home',
  standalone: true,
  imports: [
    UiComponentsModule,
    HeaderDetailsTripComponent,
    SpaceRoomsComponent,
    TripInfoDetailsComponent,
    PriceDetailsComponent,
    TripFeaturesComponent,
    PackageLocationComponent,
    TripPhotosComponent,
    SimilarVacationHomeComponent,
    RatingDetailsComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './details-vacation-home.component.html',
  styleUrl: './details-vacation-home.component.scss',
})
export class DetailsVacationHomeComponent implements OnInit {
  id?: number = null;
  dateFrom: string = null;
  dateTo: string = null;
  vacationHome: GetVacationHomeDetailsForGuestResponseDto = null;
  lang = this.sessionState.getLanguage();
  isRatingTabLoaded:boolean = false
  constructor(
    private vacationHomeService: VacationHomeGuestService,
    private route: ActivatedRoute,
    private sessionState:SessionStateService,
    private router: Router,
   

  ) {   

  }
  images=[]
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && event.navigationTrigger === 'popstate') {
        location.reload();
      }
    });
  
    this.route.params.subscribe({
      next:next=>{

        this.id = next['id'];
      }
    })
    const _dateFrom = this.route.snapshot.params['dateFrom'];
    const _dateTo = this.route.snapshot.params['dateTo'];
    if (_dateFrom) this.dateFrom = _dateFrom;
    if (_dateTo) this.dateTo = _dateTo;
    if (!this.id) {
      this.router.navigate(['/']);
    }
    this.vacationHomeService.getDetails(this.id).subscribe(data => {
      if(data){

        this.vacationHome = data;
        if(this.vacationHome.vacationHome.vacationHomeImages.length){
  
          this.images = [
            {
              imagePath:this.vacationHome.vacationHome.primaryImage,
              isPrimary:true
            },
            ...this.vacationHome.vacationHome.vacationHomeImages,
            
          ]
        }else{
          this.images = [
            {
              imagePath:this.vacationHome.vacationHome.primaryImage,
              isPrimary:true
            }
          ]
        }
      }
      
    },error=>{
      
        this.router.navigate(['/error']);
      
    });
  }
  onTabChange(index: number): void {
    if (index === 3) { 
      this.isRatingTabLoaded = true;
    }
  }
}
