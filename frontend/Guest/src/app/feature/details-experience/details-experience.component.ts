import { Component, OnInit } from '@angular/core';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import { HeaderDetailsTripComponent } from './components/header-details-trip/header-details-trip.component';
import { PriceDetailsComponent } from './components/price-details/price-details.component';
import { CommonModule } from '@angular/common';
import { TripInfoDetailsComponent } from './components/trip-info-details/trip-info-details.component';
import { SpaceRoomsComponent } from './components/space-rooms/space-rooms.component';
import { PackageLocationComponent } from './components/package-location/package-location.component';
import { TripPhotosComponent } from './components/trip-photos/trip-photos.component';
import { ExperienceGuestService, GetExperienceDetailsForGuestResponseDto } from '@proxy/experiences';
import { ActivatedRoute, NavigationStart, Router, RouterModule, Event } from '@angular/router';
import { SimilarHomeComponent } from './components/similar-home/similar-home.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { RatingDetailsComponent } from '../rating-details/rating-details.component';
@Component({
  selector: 'app-details-experience',
  standalone: true,
  imports: [
    UiComponentsModule,
    HeaderDetailsTripComponent,
    SpaceRoomsComponent,
    TripInfoDetailsComponent,
    PriceDetailsComponent,
    PackageLocationComponent,
    TripPhotosComponent,
    CommonModule,
    RouterModule,
    SimilarHomeComponent,
    NzCarouselModule,
    RatingDetailsComponent
  ],
  templateUrl: './details-experience.component.html',
  styleUrl: './details-experience.component.scss',
})
export class DetailsExperienceComponent implements OnInit {
  id?: number = null;
  dateFrom: string = null;
  dateTo: string = null;
  experience: GetExperienceDetailsForGuestResponseDto = null;
  isRatingTabLoaded = false;

  constructor(
    private experienceService: ExperienceGuestService,
    private route: ActivatedRoute,
    private router: Router,

  ) {
    this.id = this.route.snapshot.params['id'];
    const _dateFrom = this.route.snapshot.params['dateFrom'];
    const _dateTo = this.route.snapshot.params['dateTo'];
    if (_dateFrom) {this.dateFrom = _dateFrom};
    if (_dateTo) {this.dateTo = _dateTo};
  }

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
    
    if (!this.id) {
      this.router.navigate(['/']);
    }
    this.experienceService.getDetails(this.id).subscribe(data => {
      this.experience = data;
    console.log(this.experience)
    },error=>{
      
      this.router.navigate(['/error']);
    
  });
  }
  
  onTabChange(index: number): void {
    if (index === 2) { 
      this.isRatingTabLoaded = true;
    }
  }
}
