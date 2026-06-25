import { CoreModule } from '@abp/ng.core';
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
  settings = [
    {
      name: 'سياسة الأرجاع',
      select: false,
      path: 'account-settings',
    },
    {
      name: 'الشحن والتوصيل',
      select: false,
      path: 'reservation-settings',
    },
    {
      name: 'المدفوعات',
      select: false,
      path: 'service-prices-settings',
    },
    {
      name: 'سياسة الخصوصية',
      select: false,
      path: 'reservation-settings',
    },
    {
      name: 'عروض الرحلات',
      select: false,
      path: 'reservation-settings',
    },
    {
      name: 'الضريبة الاضافية',
      select: false,
      path: 'reservation-settings',
    },
    {
      name: 'حجوزات الفنادق',
      select: false,
      path: 'reservation-settings',
    },
    {
      name: 'مواعيد الأنتظار',
      select: true,
      path: 'reservation-settings',
    },
  ];

  questionsAnswers = [
    {
      title: 'ما هي المسافة الإجمالية لرحلة الجبل؟',
      description:
        'تمتد رحلتنا الجبلية على مدى مسافة إجمالية تقدر بـ [المسافة]، حيث ستمتد التجربة عبر مناطق مختلفة من الجبل مع إمكانية التحدي واستكشاف المعالم الطبيعية.',
      open: false,
    },
    {
      title: 'هل هناك متطلبات خاصة للمشاركة في الرحلة؟',
      description:
        'تمتد رحلتنا الجبلية على مدى مسافة إجمالية تقدر بـ [المسافة]، حيث ستمتد التجربة عبر مناطق مختلفة من الجبل مع إمكانية التحدي واستكشاف المعالم الطبيعية.',
      open: false,
    },
    {
      title: 'هل تتوفر وجبات طعام أثناء الرحلة؟',
      description:
        'تمتد رحلتنا الجبلية على مدى مسافة إجمالية تقدر بـ [المسافة]، حيث ستمتد التجربة عبر مناطق مختلفة من الجبل مع إمكانية التحدي واستكشاف المعالم الطبيعية.',
      open: false,
    },
    {
      title: 'هل تتوفر خدمات التخييم والمعسكرات؟',
      description:
        'تمتد رحلتنا الجبلية على مدى مسافة إجمالية تقدر بـ [المسافة]، حيث ستمتد التجربة عبر مناطق مختلفة من الجبل مع إمكانية التحدي واستكشاف المعالم الطبيعية.',
      open: false,
    },
    {
      title: 'هل يمكنني تخصيص رحلة خاصة لمجموعتي؟',
      description:
        'تمتد رحلتنا الجبلية على مدى مسافة إجمالية تقدر بـ [المسافة]، حيث ستمتد التجربة عبر مناطق مختلفة من الجبل مع إمكانية التحدي واستكشاف المعالم الطبيعية.',
      open: false,
    },
    {
      title: 'هل هناك متطلبات خاصة للمشاركة في الرحلة؟',
      description:
        'تمتد رحلتنا الجبلية على مدى مسافة إجمالية تقدر بـ [المسافة]، حيث ستمتد التجربة عبر مناطق مختلفة من الجبل مع إمكانية التحدي واستكشاف المعالم الطبيعية.',
      open: false,
    },
    {
      title: 'هل تتوفر وجبات طعام أثناء الرحلة؟',
      description:
        'تمتد رحلتنا الجبلية على مدى مسافة إجمالية تقدر بـ [المسافة]، حيث ستمتد التجربة عبر مناطق مختلفة من الجبل مع إمكانية التحدي واستكشاف المعالم الطبيعية.',
      open: false,
    },
    {
      title: 'هل تتوفر خدمات التخييم والمعسكرات؟',
      description:
        'تمتد رحلتنا الجبلية على مدى مسافة إجمالية تقدر بـ [المسافة]، حيث ستمتد التجربة عبر مناطق مختلفة من الجبل مع إمكانية التحدي واستكشاف المعالم الطبيعية.',
      open: false,
    },
    {
      title: 'هل يمكنني تخصيص رحلة خاصة لمجموعتي؟',
      description:
        'تمتد رحلتنا الجبلية على مدى مسافة إجمالية تقدر بـ [المسافة]، حيث ستمتد التجربة عبر مناطق مختلفة من الجبل مع إمكانية التحدي واستكشاف المعالم الطبيعية.',
      open: false,
    },
    {
      title: 'هل تتوفر خدمات التخييم والمعسكرات؟',
      description:
        'تمتد رحلتنا الجبلية على مدى مسافة إجمالية تقدر بـ [المسافة]، حيث ستمتد التجربة عبر مناطق مختلفة من الجبل مع إمكانية التحدي واستكشاف المعالم الطبيعية.',
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
