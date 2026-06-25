import { LocalizationService } from '@abp/ng.core';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ContactUsComponent } from '../feature/contact-us/contact-us.component';
import { CategoryService, GetCategoriesLookupResponse, GetCategoryCityPriceResponse } from '@proxy/categories';
import { SwiperOptions } from 'swiper/types/swiper-options';
import Swiper from 'swiper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-host-landing',
  templateUrl: './host-landing.component.html',
  styleUrl: './host-landing.component.scss',
})
export class HostLandingComponent implements OnInit,AfterViewInit{
  questionsAnswers = [
    {
      title:
        this.localizationService.currentLang == 'en'
          ? 'What is the Hyyak Platform?'
          : 'وش هي منصة حياك؟',
      description:
        this.localizationService.currentLang == 'en'
          ? 'Hyyak is a licensed tourism platform that offers guests a variety of unique destinations, including local accommodations, experiences, and activities. It enables community members to increase their income by embracing a tourism role, welcoming guests, and sharing a unique local story. '
          : 'هي منصة سياحية مرخصة، تقدم للضيوف وجهات مختلفة ومتنوعة من أماكن الإقامة المحلية والتجارب والفعاليات، حياك تمكّن أفراد المجتمع من زيادة دخلهم بتفعيلدورهم السياحي لاستقبال الضيوف وعيش قصة محلية مميزة.',
      open: true,
    },
    {
      title:
        this.localizationService.currentLang == 'en'
          ? 'Is Registration on the Hyyak Platform Free?'
          : 'هل التسجيل في منصة حياك  برسوم؟',
      description:
        this.localizationService.currentLang == 'en'
          ? 'Yes, registration is free, with no charges.'
          : 'التسجيل مجاناً، حياك بدون أي رسوم.',
      open: false,
    },
    {
      title:
        this.localizationService.currentLang == 'en'
          ? 'Who is a Hyyak Host?'
          : 'من هو المُضيف عند حيّاك؟',
      description:
        this.localizationService.currentLang == 'en'
          ? `A host on Hyyak is either:  

An individual with a place that reflects local culture and is available for short-term rentals, such as a holiday home, heritage house, camp, resort, apartment, or outdoor space, among others.  

Or, an individual or business with the skills or resources to offer activities, such as recreational events, crafts, art experiences, exploration tours, adventures, or cultural trips (e.g., a tour organizer or similar).`
          : 'هو إما شخص عنده مكان بطابع محلّي يؤجر للناس ليستضيفهم فيه، على سبيل المثال لا الحصر: بيت عطلة، بيت تراثي، مخيم ، منتجع، شقه، مساحة خارجية، ... وغيرها. أو شخص عنده الخبرة أو المهارة أو الإمكانات ليقدّمها للناس، على سبيل المثال لا الحصر: نشاط ترفيهي ، تجربة حرفية، تجربة فنية، جولة استكشاف او مغامرة، رحلة سياحية او ثقافية ،،،الخ (سواء كان شخص او جهة تجارية مثل منظم الرحلات وغيرها). سواءً كان المُضيف فرد أو جهة',
      open: false,
    },
    {
      title:
        this.localizationService.currentLang == 'en'
          ? 'Who is a Guest on Hyyak?'
          : 'من هو الضَّيف في حياك؟',
      description:
        this.localizationService.currentLang == 'en'
          ? 'A guest is someone looking for accommodations or to participate in local cultural activities.'
          : 'شخص يبحث عن الإقامة في مكان أو تجربة نشاط بطابع محلّي ',
      open: false,
    },
    {
      title:
        this.localizationService.currentLang == 'en'
          ? 'Why Choose Hyyak for Hosting?'
          : 'ليش أختار حياك للاستضافة ؟',
      description:
        this.localizationService.currentLang == 'en'
          ? `<ul>
          <li>Digital connection with customers that protects your rights.   </li>

            <li>Hosting designed with your terms and guarantees.   </li>

            <li>Consistent and increased revenue.   </li>

            <li>Easy and secure digital booking management.   </li>

            <li>Exclusive services for Hyyak customers, like professional photography and promotion.  </li>

            <li>Showcase your story and customer reviews widely.   </li>

            <li>Strengthen the cultural tourism connection through your service. </li>
            </ul>`
          : `<ul>

          <li> لربط بينك وبين العملاء بشكل رقمي يحفظ الحقوق.</li>
          <li> تصميم الاستضافة بشروطك وضماناتك.</li>
          <li> زيادة إيراداتك المالية واستدامتها.</li>
          <li> تنظيم حجوزاتك رقمياً واستقبالها بسهولة وأمان.</li>
          <li> خدمات حصرية لعملاء حياك مثل التصوير الاحترافي والترويج.</li>
          <li> إبراز قصتك وتقييمات عملائك على نطاق واسع.</li>
          <li> تعزيز الارتباط السياحي بالهوية المحلية من خلال خدمتك.</li>
          </ul>`,
      open: false,
    },
    {
      title:
        this.localizationService.currentLang == 'en'
          ? 'What are the Requirements to Join Hyyak as a Host?  '
          : 'وش شروط الانضمام بصفة مُضيف لمنصة حياك ؟',
      description:
        this.localizationService.currentLang == 'en'
          ? `

          <strong> Eligibility</strong> : Hosts must be over 18, legally able to establish a binding agreement, and have all necessary and valid documentation.  <br/>

<strong> Responsiveness:</strong> Maintain a high response rate to inquiries and booking requests within 24 hours.  <br/>

<strong> Booking Acceptance:</strong> Accept bookings whenever available, with continuous updates to availability.  <br/>

<strong> Avoiding Cancellations:</strong> Cancellations are taken seriously, and we ask all hosts to avoid canceling guest bookings as their travel plans rely on them. If unavoidable, notify the guest at least 72 hours in advance.  <br/>

<strong> Maintaining High Ratings:</strong> Guests value consistent quality, regardless of booking location. Our team provides time for hosts with low ratings to improve, but if ratings remain low, the listing may be removed.  <br/>

<strong> Safety and Security Compliance:</strong> Hosts must adhere to the approved safety regulations, regularly inspect their property, and ensure safety standards are met.  <br/>

<strong> Quality and Professionalism in Service:</strong> Hosts are expected to provide excellent service, paying attention to every detail. The Hyyak team offers advice and guidance if needed. <br/> 

<strong> Acceptance of Terms and Standards:</strong> Access to all platform tools is contingent on agreeing to the terms and conditions and adhering to the platform's established standards.<br/>`
          : ` وعنده الحق الشرعي لإنشاء التزام قانوني ويملك كافة الوثائق اللازمة سارية المفعول.<br/>

<strong>سرعة الاستجابة: </strong>الحفاظ على معدل عالي من الاستجابة و الرد على الاستفسارات وطلبات الحجز خلال 24 ساعة.<br/>

<strong>قبول طلبات الحجز:</strong> قبول الطلبات كلما كنت متاحًا، مع أهمية التحديث المستمر لحالة الحجز.<br/>

<strong>تجنُب الإلغاءات:</strong> نتعامل مع الإلغاءات على محمل الجد ونطلب من جميع المستضيفين تجنب إلغاء حجوزات الضيوف لأن خطط سفرهم تعتمد عليها، وفي حال صار أي ظرف يستدعي الإلغاء لابد من إشعار الضيف بالإلغاء في مدة لا تقل عن 72 ساعة.<br/>

<strong>الحفاظ على تقييم عالي:</strong> الضيوف يهمهم يكون فيه مستوى ثابت من الجودة، بغض النظر عن مكان الحجز. فريقنا بيعطي المساكن\التجارب اللي تقييماتها ضعيفة مهلة لمعالجة الوضع، وإذا استمر انخفاض التقييم بيتم إلغاءها تماماً من المنصة.<br/>

<strong>مراعاة شروط الأمن والسلامة:</strong> يلتزم المستضيف بلوائح الأمن والسلامة المعتمدة من قبل الجهات المختصة وفحصها والتأكد من جاهزيتها بشكل دوري ولا يلحق المنصة اي مطالبات نتيجة إهمال هذا الشرط.<br/>

<strong>مراعاة الجودة والاحترافية في الخدمة المقدمة:</strong> يلتزم المُضيف بتقديم الخدمة بأفضل الأشكال من خلال الاهتمام بكل تفاصيل الخدمة، وفريق حياك يساعدك في حال احتجت للنصائح والإرشاد.<br/>

<strong>الموافقة على الشروط والأحكام والمعايير:</strong> وصول المُضيف لكل أدوات المنصة مرتبط بالموافقة على الشروط والأحكام والالتزام بالمعايير المحددة.`,
      open: false,
    },
  ];
  lang = this.localizationService.currentLang;
  tabs = [
    { name: this.lang === 'ar' ? 'بيوت العطلات' : 'Vacation Home', id: 1 },
    // { name: this.lang === 'ar' ? 'التجارب' : 'Experience', id: 2 },
  ];
  slides=[
    // {src:"assets/imgs/host/partners/tourism.svg"},
    // {src:"assets/imgs/host/partners/rooh.svg"},
    {src:"assets/imgs/host/partners/partner.svg"},
    {src:"assets/imgs/host/partners/guestna.svg"},
    {src:"assets/imgs/host/partners/cruse.svg"},
    {src:"assets/imgs/host/partners/k.svg"}
  ]
  type = '';
  country = '';

  filterParams={
    name:'',
    maxResultCount:1000,
    skipCount:0,
    sorting:'', 
  }
  categortTypes :GetCategoriesLookupResponse []
  countries:GetCategoryCityPriceResponse[]
  selectedprice:number
  constructor(
    private localizationService: LocalizationService,
    private modalService: NzModalService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(){
    this.getCategoryType(0)
  }
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
          spaceBetween: 10,
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

    new Swiper('.centered-slide-carousel', swiperConfig);
  };
  selectQuestionsAnswersItem(item: any) {
    if (!!item.open) {
      return (item.open = false);
    }

    const currentSelected = this.questionsAnswers.find(item => !!item.open);
    if (!!currentSelected) {
      currentSelected!.open = false;
    }

    item.open = true;
  }
  openContact() {
    window.scroll(0,0)
    this.modalService.create({
      nzFooter: null,
      nzWidth: 700,
      nzClassName: 'rounded-xl',
      nzContent: ContactUsComponent,
    });
  }
  getCategoryType(tab:number){
    let input= {
      ...this.filterParams,
      type:tab,
    }
    this.categoryService.getCategoryLookup(input).subscribe({
      next:next=>{
        this.categortTypes = next.items
      }
    })
  }
  selectTab(data:any){
    this.getCategoryType(data.index)
    this.countries =[]
    this.selectedprice =null

  }
  selectType(data:any){
    this.selectedprice =null
    this.categoryService.getPricesByInput({categoryId:data}).subscribe({
      next:next=>{
        this.countries = next
      }
    })
  }
  selectCountry(data:any){
    this.selectedprice = this.countries.filter((x:any)=> x.id === data)[0].price
  }
  goToLogin(){
        let url = environment.hostUrl + '/auth/login/?no-email';
        window.location.href = url;
  }
}
