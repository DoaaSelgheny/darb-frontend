import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienceWithNavigationPropertiesDto, ExperienceGuestService } from '@proxy/experiences';
import { RatingsGuestService, ServiceType } from '@proxy/ratings';
import { VacationHomeWithNavigationPropertiesDto, VacationHomeGuestService } from '@proxy/vacation-homes';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RatingComponent } from '../reservation/components/rating/rating.component';
import { ReservationType } from '@proxy/reservation-users';
import { ConfigStateService, LocalizationService } from '@abp/ng.core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit{
  filterObject: any = null;
  vacationHomes: VacationHomeWithNavigationPropertiesDto[];
  experiences: ExperienceWithNavigationPropertiesDto[];
  mergedArray=[]
  reserveType = ServiceType
  lang = this.localizationService.currentLang;
  currentUser: any;
  constructor(
    private vacationHomeService: VacationHomeGuestService,
    private experienceService: ExperienceGuestService,
    private ratingService:RatingsGuestService,
    private modalService: NzModalService,
    private localizationService: LocalizationService,
    private router: Router,
    private config: ConfigStateService,

  ) {
    this.currentUser = this.config.getOne('currentUser');

  }
  ngOnInit(): void {  
      
    if (this.currentUser.isAuthenticated) {

      this.getReservationIdForRating();
    }
    this.getExploreData();
    
  
  }
  getReservationIdForRating(){
    this.ratingService.getReservationIdForRating().subscribe({
      next:next=>{
        if(next.reservationId){
          if(next.serviceType === this.reserveType.VacationHome){

            let data = {
              id:next.reservationId,
              reservationType:next.serviceType,
              vacationHomeName:next.name,
              image:next.img,
              city:{name:next.city},
              district:{name:next.district},
              ratingsAverage:next.ratingsAverage,
              ratingsCount:next.ratingsCount
            }
            const modal = this.modalService.create({
              nzFooter: null,
              nzWidth: 700,
              nzClassName: 'rounded-xl',
              nzContent: RatingComponent,
              nzData:{item:data}
            });
          }else{
            let data = {
              id:next.reservationId,
              reservationType:next.serviceType,
              experienceName:next.name,
              image:next.img,
              city:{name:next.city},
              district:{name:next.district},
              ratingsAverage:next.ratingsAverage,
              ratingsCount:next.ratingsCount
            }
            const modal = this.modalService.create({
              nzFooter: null,
              nzWidth: 700,
              nzClassName: 'rounded-xl',
              nzContent: RatingComponent,
              nzData:{item:data}
            });
          }
        }
      }
    })
  }
  
  getExploreData(){
    this.vacationHomeService
    .getList({
      maxResultCount: 10,
      cityIds: null,
      vacationHomeTypeIds: null,
      showOnHome:true,
      sorting:'Random'

    })
    .subscribe({
      next: data => {
        this.vacationHomes = data.items;
        this.experienceService
        .getList({
          maxResultCount: 10,
          cityIds: null,
          experienceTypeIds: null,
          showOnHome:true,
          sorting:'Random'
        })
        .subscribe({
          next: data => {
            this.experiences = data.items;
            this.vacationHomes = [...this.vacationHomes.map(item => ({ ...item, isExperience: false }))]
            this.experiences = [
              ...this.experiences.map(item => ({ ...item, isExperience: true }))
            ];
            this.mergeArray()
          },
        });
      },
    });
  }
  mergeArray() {
    const maxLength = Math.max(this.vacationHomes?.length, this.experiences?.length);
    const result = [];
    for (let i = 0; i < maxLength; i++) {
      if (i < this.vacationHomes.length) {
        result.push(this.vacationHomes[i]);
      }
      if (i < this.experiences.length) {
        result.push(this.experiences[i]);
      }
    }
      this.mergedArray = result;
  }
  explore() {
    this.router.navigate(['/explore']);
  }

  changeFilter($event) {
    this.filterObject = $event;
  }
  ngAfterViewChecked(): void {
    if (localStorage.getItem('reserveUrl')) {
    window.location.href=(localStorage.getItem('reserveUrl'))
    }
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    
  }
}
