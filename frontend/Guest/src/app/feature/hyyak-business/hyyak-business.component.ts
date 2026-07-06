import { LocalizationService } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import { ToasterService } from '@abp/ng.theme.shared';
import { CoreModule } from '@abp/ng.core';

import {
  NgxIntlTelInputModule,
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input-gg';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { markAllAsDirty } from 'src/shared/helpers/markAllAsDirty';
import { DistributedNotificationService } from '@proxy/notifications/distributed-notification.service';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { Swiper } from 'swiper';
import { Pagination } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { PartnersComponent } from './partners/partners.component';

Swiper.use([Pagination]);
@Component({
  selector: 'app-hyyak-business',
  standalone: true,
  imports: [
    CommonModule,
    UiComponentsModule,
    CoreModule,
    RecaptchaModule,
    SharedModule,
    NgxIntlTelInputModule,
    NzCarouselModule,
    PartnersComponent,
  ],
  templateUrl: './hyyak-business.component.html',
  styleUrl: './hyyak-business.component.scss',
})
export class HyyakBusinessComponent implements AfterViewInit, OnInit {
  lang = this.localizationService.currentLang;
  form: FormGroup = new FormGroup({});
  showMessage: boolean;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  onlySaudiCountry = CountryISO.SaudiArabia;
  SearchCountryField = SearchCountryField;
  preferredCountries = [CountryISO.SaudiArabia, CountryISO.Egypt];
  selectedCountryISO = CountryISO.SaudiArabia;
  constructor(
    private localizationService: LocalizationService,
    private fb: FormBuilder,
    private toaster: ToasterService,
    private cdr: ChangeDetectorRef,
    private distributedNotificationService: DistributedNotificationService,
  ) {}
  slides = [
    {
      imgSrc: 'assets/imgs/host/mini-logo.svg',
      name: this.lang == 'ar' ? 'يانا' : 'Yana',
      work: 'موظفة لدى: 1',
      body:
        this.lang == 'ar'
          ? 'لقد كانت فرصة رائعة أن نتشارك لحظات مميزة مع المجتمع المحلي، لقد كانت تجربتي في الباحة مختلفة استمتعت جداً بالتعرف على الثقافة وأُعجبت بالمباني القديمة المليئة بالإبداع وأحببت الأكل التقليدي جداً'
          : 'It was a wonderful opportunity to share meaningful moments with the local community. My experience in Al-Baha was truly unique—I thoroughly enjoyed discovering the culture, admired the old, creatively crafted buildings, and absolutely loved the authentic traditional cuisine',
    },
    {
      imgSrc: 'assets/imgs/host/mini-logo.svg',
      name: this.lang == 'ar' ? 'محمد العريمي' : 'Mohammed Al-Arimi',
      work: 'موظفة لدى: 2',
      body:
        this.lang == 'ar'
          ? 'رحلة فاخرة وفريق احترافي متكامل، أعجبت جداً بالاستقبال والحفاوة من وإلى المطار، وكان ذلك منعكس على جميع الخدمات المقدمة من قبل حيّاك، تجربة استمرت لمدة سبعة أيام مابين الرياض والعلا عشت فيها أجمل اللحظات، شكراً فريق حياك'
          : 'A luxurious journey with a fully professional team. I was thoroughly impressed by the warm welcome and hospitality from the moment I arrived at the airport to my departure. This exceptional service was reflected in every aspect provided by Hayyak. It was a seven-day experience between Riyadh and Al-Ula, filled with unforgettable moments. Thank you, Hayyak team.',
    },
    {
      imgSrc: 'assets/imgs/host/mini-logo.svg',
      name: this.lang == 'ar' ? 'ربيكا' : 'Rebecca',
      work: 'موظفة لدى: 3',
      body:
        this.lang == 'ar'
          ? 'أنا كصحفية أميركية أتطلع لأن استكشف الثقافات والقصص المحلية، رحلتي إلى الباحة مع فريق حيّاك كانت استثنائية لاستكشاف القصص والحكايا التي ساعدتني في الاندماج مع الثقافة .. سوف أقوم بتكرار التجربة إلى وجهة جديدة قادمة '
          : 'As an American journalist with a passion for exploring cultures and local stories, my journey to Al-Baha with the Hayyak team was exceptional. It allowed me to uncover stories and tales that helped me deeply connect with the culture. I look forward to repeating this experience in a new destination soon.',
    },
  ];
  services = [
    {
      name: this.lang === 'ar' ? 'تذاكر الطيران' : 'Air Tickets',
      img: 'assets/imgs/hyak-business/services/bg1.svg',
      icon: 'assets/imgs/hyak-business/services/icon1.svg',
    },
    {
      name: this.lang === 'ar' ? 'مواصلات' : 'Transportation',
      img: 'assets/imgs/hyak-business/services/bg2.svg',
      icon: 'assets/imgs/hyak-business/services/icon2.svg',
    },
    {
      name: this.lang === 'ar' ? 'أماكن للإقامة' : 'Accommodation',
      img: 'assets/imgs/hyak-business/services/bg3.svg',
      icon: 'assets/imgs/hyak-business/services/icon3.svg',
    },
    {
      name: this.lang === 'ar' ? 'ضيافة محلية' : 'Local Hospitality',
      img: 'assets/imgs/hyak-business/services/bg4.svg',
      icon: 'assets/imgs/hyak-business/services/icon4.svg',
    },
    {
      name: this.lang === 'ar' ? 'جولات سياحية ' : 'Sightseeing Tours',
      img: 'assets/imgs/hyak-business/services/bg5.svg',
      icon: 'assets/imgs/hyak-business/services/icon5.svg',
    },
    {
      name: this.lang === 'ar' ? 'تجارب محلية' : 'Local Experiences',
      img: 'assets/imgs/hyak-business/services/bg6.svg',
      icon: 'assets/imgs/hyak-business/services/icon6.svg',
    },
  ];
  names = [
    { key: 'جهة1', value: 1 },
    { key: 'جهة2', value: 2 },
  ];
  ngOnInit(): void {
    this.handleForm();
  }
  ngAfterViewInit(): void {
    const swiperConfig: SwiperOptions = {
      loop: true,
      spaceBetween: 40,
      slideToClickedSlide: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        1920: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1028: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        990: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        550: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        350: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
      },
    };

    new Swiper('.centered-slide-carousel', swiperConfig);
  }

  handleForm() {
    this.form = this.fb.group({
      // TODO add custom validation for each option
      organizationName: this.fb.control('', [Validators.required]),
      name2: this.fb.control('', [Validators.required]),
      phoneNumber: ['', { validators: [Validators.required], updateOn: 'blur' }],
      email: this.fb.control('', [Validators.required, Validators.email]),
      details: this.fb.control('', [Validators.required]),
      captcha: this.fb.control(null, [Validators.required]),
    });
  }
  allowPaste(event: ClipboardEvent): boolean {
    const pastedData = (event.clipboardData || event.target['clipboardData'])?.getData(
      'text/plain',
    );
    if (!pastedData || !/^\d+$/.test(pastedData)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
  resolved(captchaResponse: string) {
    if (captchaResponse) this.form.controls['captcha'].setValue(captchaResponse);
    else this.form.controls['captcha'].setValue(null);
  }
  sendMessage() {
    if (this.form.valid) {
      this.showMessage = false;
      this.distributedNotificationService
        .sendHtmlEmail(
          `
        <h3>اسم الجهة:${this.form.value.organizationName}  </h3>
        <h3>ممثل الجهة: ${this.form.value.name2}   </h3>
        <h3>رقم الهاتف:  ${this.form.getRawValue().phoneNumber?.internationalNumber}  </h3>
        <h3>عنوان البريد الإلكتروني: ${this.form.value.email}  </h3>
        <h3>تفاصيل الطلب: ${this.form.value.details}</h3>
        <h4>
        يرجى مراجعة الاستفسار والرد عليه في أقرب وقت ممكن.
        </h4>
        <h6>شكرًا</h6>`,
          'Hala@hyyak.com',
          'Name',
          ' رسالة جديدة من نموذج ضيوف الأعمال',
        )
        .subscribe(data => {
          this.showMessage = true;

          this.cdr.detectChanges();
          this.toaster.success('تم إسال طلبك بنجاح ');
          window.scroll(0, 0);

          this.form.reset();
        });
    } else {
      markAllAsDirty(this.form);
    }
  }
}
