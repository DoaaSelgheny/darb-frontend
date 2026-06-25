
import { AuthErrorFilterService, LocalizationService } from '@abp/ng.core';
import { AfterViewInit, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ExperienceWithNavigationPropertiesDto } from '@proxy/experiences';
import {
  VacationHomeWithNavigationPropertiesDto,
} from '@proxy/vacation-homes';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';

@Component({
  selector: 'app-explore-section',
  templateUrl: './explore-section.component.html',
  styleUrl: './explore-section.component.scss',
})
export class ExploreSectionComponent implements OnInit,AfterViewInit {
  list: any[] = [];
  // @Input() vacationHomes: VacationHomeWithNavigationPropertiesDto[]=[];
  // @Input() experiences: ExperienceWithNavigationPropertiesDto[]=[];
  @Input() mergedArray: any[] = [];
  combinedArray: any[] = [];
  @Input() filter: any = null;
  lang = this.localizationService.currentLang;
  constructor(
     private localizationService: LocalizationService,
  ) {}
  ngOnInit(): void {

  }
  // mergedArray=[]
  // mergeArray() {
  //   const maxLength = Math.max(this.vacationHomes?.length, this.experiences?.length);
  //   const result = [];
  //   for (let i = 0; i < maxLength; i++) {
  //     if (i < this.vacationHomes.length) {
  //       result.push(this.vacationHomes[i]);
  //     }
  //     if (i < this.experiences.length) {
  //       result.push(this.experiences[i]);
  //     }
  //   }
  //     this.mergedArray = result;
  // }
  ngAfterViewInit(): void {

      setTimeout(() => {
        this.initSwiper('.centered-slide-carousel4');
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
    console.log(swiperContainer,selector);
    
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
}
