import { LocalizationService } from '@abp/ng.core';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienceTypeDto } from '@proxy/experience-types';
import { ExperienceGuestService } from '@proxy/experiences';
import { VacationHomeTypeDto } from '@proxy/vacation-home-types';
import { VacationHomeGuestService } from '@proxy/vacation-homes';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';

@Component({
  selector: 'app-activities-section',
  templateUrl: './activities-section.component.html',
  styleUrl: './activities-section.component.scss',
})
export class ActivitiesSectionComponent implements OnInit,AfterViewInit {
  constructor(
    private vacationHomeService: VacationHomeGuestService,
    private experienceService: ExperienceGuestService,
    private router: Router,
    public localizationService: LocalizationService
  ) { }

  vacationHomeTypes: VacationHomeTypeDto[];
  experienceTypes: ExperienceTypeDto[];
  // items = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Original array of items
  groupedItems = [];
  effect = 'scrollx';
  
  ngOnInit(): void {
    this.vacationHomeService.getVacationHomeTypes({ maxResultCount: 1000 }).subscribe(data => {
      this.vacationHomeTypes = data;
    });
    this.experienceService.getExperienceTypeLookup().subscribe(data => {
      this.experienceTypes = data;
    });
    
  }

    
  goto(obj, type) {
    if (type == 'vacationHome')
      this.router.navigate(['explore/vacation-home', { vacationHomeTypeId: obj.id }]);
    if (type == 'experience')
      this.router.navigate(['explore/experience', { experienceTypeId: obj.id }]);
  }

  getImage(txt) {
    return txt.src;
    
    // `assets/imgs/${txt.name.replace(' ', '_')}.png`;
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initSwiper('.centered-slide-carousel2');
      this.initSwiper('.centered-slide-carousel3');
    }, 0);
  }
  swiperConfig: SwiperOptions = {
    loop: true,
    spaceBetween: 40,
    slideToClickedSlide: false,
    autoplay: { delay: 500 },
    breakpoints: {
      1920: { slidesPerView: 4, spaceBetween: 20 },
      1028: { slidesPerView: 4, spaceBetween: 20 },
      990: { slidesPerView: 4, spaceBetween: 0 },
      540: { slidesPerView: 2, spaceBetween: 10 },
      300: { slidesPerView: 1, spaceBetween: 10 },
    }
  };
  private initSwiper(selector: string): void {
    const swiperContainer = document.querySelector(selector);
    if (swiperContainer) {
      new Swiper(selector, this.swiperConfig);
      
    }
  }
  slideNext(selector: string){
    const swiper = document.querySelector(selector) as HTMLElement & { swiper: Swiper };
    swiper.swiper.slideNext(100);
  }
  slidePrev(selector: string){
    const swiper = document.querySelector(selector) as HTMLElement & { swiper: Swiper };
    swiper.swiper.slidePrev(100);
  }
  navigateToVacation(id:any){
    this.router.navigate(['/explore', { type:1,vacationHomeTypeId: id }]);
  }
navigateToExperience(id:any){
  this.router.navigate(['/explore', { type:2,vacationHomeTypeId: id }]);
}
  
}
