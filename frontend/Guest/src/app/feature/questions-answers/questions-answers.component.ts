import { CoreModule, LocalizationService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-questions-answers',
  standalone: true,
  imports: [RouterModule, UiComponentsModule, CoreModule],
  templateUrl: './questions-answers.component.html',
  styleUrl: './questions-answers.component.scss',
})
export class QuestionsAnswersComponent {
  constructor(private localizationService: LocalizationService) {}
  lang = this.localizationService.currentLang;
  settings = [
    {
      name:
        this.localizationService.currentLang == 'en'
          ? 'Questions about experiences'
          : 'اسئله عامه حول التجارب',
      select: true,
      path: 'account-settings',
    },
    {
      name: this.localizationService.currentLang == 'en' ? 'Payment methods' : 'طرق الدفع',
      select: false,
      path: 'reservation-settings',
    },
    {
      name:
        this.localizationService.currentLang == 'en' ? 'Value Added Tax (VAT)' : 'الضريبة الاضافية',
      select: false,
      path: 'reservation-settings',
    },
  ];

  questionsAnswers = [
    {
      title:
        this.localizationService.currentLang == 'en'
          ? 'What is the Darb Platform?'
          : 'وش هي منصة درب؟',
      description:
        this.localizationService.currentLang == 'en'
          ? ` <strong>Darb </strong> is a licensed tourism platform that offers guests a variety of destinations, including local accommodations, experiences, and activities. It empowers community members to increase their income by taking on a tourism role, welcoming guests, and providing unique local stories. `
          : 'هي منصة سياحية مرخصة، تقدم للضيوف وجهات مختلفة ومتنوعة من أماكن الإقامة المحلية والتجارب والفعاليات ، درب تمكّن أفراد المجتمع من زيادة دخلهم بتفعيل  دورهم السياحي لاستقبال الضيوف وعيش قصة محلية مميزة.',
      open: true,
    },
    {
      title:
        this.localizationService.currentLang == 'en'
          ? 'Is Registration on the Darb Platform Free?  '
          : 'هل التسجيل في منصة درب برسوم؟',
      description:
        this.localizationService.currentLang == 'en'
          ? 'Yes, registration is free, with no charges.'
          : 'التسجيل مجاناً، درب بدون أي رسوم.',
      open: false,
    },
    {
      title:
        this.localizationService.currentLang == 'en' ? 'Why Choose Darb ?' : 'ليش أختار درب؟',
      description:
        this.localizationService.currentLang == 'en'
          ? `<p>-Easy exploration, booking, and access to short-term rentals. \n </p>

<p>-Access to experiences and activities provided by locals. \n</p>

<p>-Exceptional local experiences unavailable on other platforms. \n </p>

-Opportunities for rewards and exclusive offers.  `
          :`
<p>سهولة استكشاف وحجز الأماكن قصيرة الأمد والوصول إليها. \n </p>
<p> الوصول الى التجارب والأنشطة اللي يقدمها السكان المحليين. </p>
<p> تجارب محلية استثنائية مو موجودة في أي منصة. </p>
<p> فرص للحصول على مكافآت وعروض حصرية. </p>
`,
      open: false,
    },
    {
      title:
        this.localizationService.currentLang == 'en'
          ? 'What Payment Methods Are Available?  '
          : 'وش طرق الدفع المتاحة ؟',
      description:
        this.localizationService.currentLang == 'en'
          ? 'Currently, only digital payments via Visa and MasterCard are available.'
          : 'متاح الدفع الرقمي ببطاقات الفيزا والماسترد كارد فقط حالياً.',
      open: false,
    },
    {
      title:
        this.localizationService.currentLang == 'en'
          ? 'Can I pay the reservation amount in installments? '
          : 'أقدر أدفع مبلغ الحجز بالتقسيط ؟',
      description:
        this.localizationService.currentLang == 'en'
          ? 'We will provide the installment payment feature soon.'
          : ' بنوفر ميزة الدفع بالتقسيط قريباً بإذن الله.',
      open: false,
    },
    {
      title:
        this.localizationService.currentLang == 'en'
          ? 'What Is the Refund Process in Case of Cancellation?'
          : 'إذا حصل ظرف يستوجب استرجاع المبلغ، وش الآلية المتّبعة للاسترجاع؟',
      description:
        this.localizationService.currentLang == 'en'
          ? `<p> 1-If the cancellation is by the host, the guest is entitled to a full refund.  </p>

<p> 2-If the cancellation is by the guest at least 48 hours before the booking time (and permitted in the service description), the guest is eligible for a full refund. Cancellations after this period are non-refundable. Note that policies may vary by host, so it’s important to check before requesting a refund. </p> 

<p> 3-Guests may request a refund if the service does not match the written or visual description, pending adequate evidence and Darb’s review of the complaint.</p>`
          : `
          <p>١-  في حال كان الإلغاء من المُضيف، يحق للضيف المطالبة باسترجاع كامل المبلغ.
 </p>
<p> ٢- في حال كان الإلغاء من طرف الضيف قبل الوقت المتفق عليه (٤٨ ساعة قبل موعد الحجز) وكان متاح في وصف الخدمة، فيحق للضيف استرجاع المبلغ كاملاً، و في حال كان الإلغاء بعد الوقت 
المتفق عليه فإن الضيف يفقد الحق بالمطالبة بالمبلغ. مع التنويه على اختلاف السياسات عند كل مُضيف، لذا لابد من الاطلاع قبل المطالبة بالاسترجاع.
</p>
<p>٣- يحق للضيف المطالبة باسترجاع النقود في حال ماكانت الخدمة مطابقة للوصف المكتوب أو المصوّر، بعد تقديم الدليل الكافي وتحقق إدارة حيّاك من الشكوى.
 </p>
       `,
      open: false,
    },
    {
      title:
        this.localizationService.currentLang == 'en'
          ? 'Can I Request a Comprehensive Corporate Travel Program?'
          : 'هل ممكن أطلب برنامج سياحي متكامل للشركات؟',
      description:
        this.localizationService.currentLang == 'en'
          ? `Yes, you can visit the <strong>Darb</strong> for Business Guests page to register your company’s requirements, and we’ll get back to you shortly.`
          :'نعم، تقدر تدخل لصفحة درب لضيوف الأعمال من هنا وتسجّل متطلبات الجهة وبنتواصل معك خلال وقت قصير.',
      open: false,
    },
  ];
  selectItem(item: any) {
    const currentSelected = this.settings.find(item => !!item.select);
    currentSelected!.select = false;
    item.select = true;
  }

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
}
