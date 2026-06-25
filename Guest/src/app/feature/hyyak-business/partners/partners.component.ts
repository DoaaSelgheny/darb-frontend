import { CoreModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [
    CommonModule,
    UiComponentsModule,
    CoreModule,
  ],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss'
})
export class PartnersComponent implements AfterViewInit{
  slides=[
    {src:"assets/imgs/hyak-business/partner1.svg"},
    {src:"assets/imgs/hyak-business/partner2.svg"},
    {src:"assets/imgs/hyak-business/partner3.svg"},
    {src:"assets/imgs/hyak-business/partner4.svg"},
   
  ]
  ngAfterViewInit(): void {
  
    const swiperConfig: SwiperOptions = {
      loop: true,
      spaceBetween: 40,
      slideToClickedSlide: true,
      autoplay: {
            delay: 500,
      },
      breakpoints: {
        1920: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1028: {
          slidesPerView: 4,
          spaceBetween: 70,
        },
        990: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        540: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        300: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
      },
    };

    new Swiper('.centered-slide-carousel2', swiperConfig);
  };
}
