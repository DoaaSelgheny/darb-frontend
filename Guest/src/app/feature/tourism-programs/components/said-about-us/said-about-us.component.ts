import { CoreModule } from '@abp/ng.core';
import { Component } from '@angular/core';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-said-about-us',
  standalone: true,
  imports: [CoreModule, UiComponentsModule],
  templateUrl: './said-about-us.component.html',
  styleUrl: './said-about-us.component.scss',
})
export class SaidAboutUsComponent {
  comments: any[] = [
    {
      name: 'يانا',
      traval: 'الباحة',
      description:
        'لقد كانت فرصة رائعة ان نتشارك لحظات مميزة مع المجتمع المحلي ، لقد كانت تجربتي في الباحة مختلفة استمتعت جدا بالتعرف على الثقافة واعجبت بالمباني القديمة المليئة بالابداع واحببت الاكل التقليدي جدا',
      img: 'assets/imgs/user_yana.png',
      active: true,
    },
    {
      name: 'ربيكا',
      traval: 'الباحة',
      description:
        'انا كصحفية اميركية اتطلع لان استكشف الثقافات والقصص المحليه ، رحلتي الى الباحة مع فريق حيّاك كانت استثنائية لاستكشاف القصص والحكايا التي ساعدتني في الاندماج مع الثقافة .. سوف اقوم بتكرار التجربة الى وجهه جديده قادمة 😍🇸🇦',
      active: false,
    },
    {
      name: 'محمد العريمي',
      traval: 'الرياض ، العلا',
      description:
        'رحله فاخره وفريق احترافي متكامل ، اعجبت جداً بالاستقبال والحفاوة من والى المطار وكان ذلك منعكس على جميع الخدمات المقدمة من قبل حيّاك ، تجربة استمرت لمدة سبعة ايام مابين الرياض والعلا عشت فيها اجمل اللحظات ، شكراً فريق حياك',
      active: false,
    },
    {
      name: 'فرح شعبان',
      traval: 'الرياض',
      description:
        'شكرا حياك ، استمتعت بلحظاتي في السعودية واول زيارة الى مدينة الرياض ، تجربة مليئة بالمغامرة استمرت لمدة اسبوع ، لحظات شيقة عشتها في اجمل الوجهات السياحية في مدينة الرياض مابين الثقافة والفن والازياء .',
      active: false,
    },
    {
      name: 'علي غزلان',
      traval: '',
      description:
        'تجربة فاخرة من طراز عالي ، تجربة مطاعم وفنادق عالمية مع فريق حيّاك ، تيم رائع ومتمكن سهل لنا الوصول الى اصعب الاماكن',
      active: false,
    },
    {
      name: 'سونيا',
      traval: 'قرى الجنوب ',
      description:
        'هذه مغامرتي الاولى لزيارة السعودية واستكشافها ، المضيفين السعوديين رائعين ، وجولتي في قرى جنوب السعودية مبهرة عشت ايام جميلة بين السكان المحليين سكنت لديهم وتعرفت على العادات والتقاليد ، ارتديت الازياء التقليدية وقمت بتجربة الطهي معهم واستمعت بروتين حياتهم في القرية. لم اشعر انني كنت ضيفه قادمة من قارة أخرى بل شعرت كانني فرد من عائلاتهم💚 بالفعل وقعت في حب هذه البلد الرائعة وسأوصي الجميع بالقدوم اليها وان يحظوا بذلك مع حيّاك الرائعين',
      active: false,
    },

    {
      name: 'رهف جمبي',
      traval: 'مدينة جازان',
      description:
        'رحلتي الى مدينة جازان وزيارة الاسر السعودية في منازلهم الخاصة خلقت لدي صورة استثنائية توجب علي نقلها الى العالم',
      img: 'assets/imgs/user_rahaf.jpeg',
      active: false,
    },
  ];
  activeComments: any = this.comments[0];

  handelActiveUser(index: number) {
    this.comments.find(user => user.active).active = false;
    this.comments[index].active = true;
    this.activeComments = this.comments[index];
  }
}
