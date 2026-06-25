import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FieldComponent } from './field/field.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ContentCardComponent } from './content-card/content-card.component';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { TextareaComponent } from './textarea/textarea.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FieldLabelComponent } from './field-label/field-label.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { CollapseComponent } from './collapse/collapse.component';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { CounterComponent } from './counter/counter.component';
import { ProgressGroupComponent } from './progress-group/progress-group.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzImageModule } from 'ng-zorro-antd/image';
import { StatisticItemComponent } from './statistic-item/statistic-item.component';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { ValidationComponent } from './validation/validation.component';
import { CoreModule } from '@abp/ng.core';
import { ConfrontationPopupComponent } from './confrontation-popup/confrontation-popup.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AlertComponent } from './alert/alert.component';
import { DirectivesModule } from '../directives/directives.module';

const ngZorroModules = [
  CoreModule,
  DirectivesModule,
  NzButtonModule,
  NzRadioModule,
  NzIconModule,
  NzTabsModule,
  NzTagModule,
  NzUploadModule,
  NzProgressModule,
  NzAvatarModule,
  NzBreadCrumbModule,
  NzEmptyModule,
  NzSkeletonModule,
  NzSelectModule,
  NzAlertModule,
  NzInputModule,
  NzDropDownModule,
  NzBadgeModule,
  NzCardModule,
  NzDatePickerModule,
  NzCheckboxModule,
  NzSwitchModule,
  NzPopoverModule,
  NzDividerModule,
  NzPaginationModule,
  NzSliderModule,
  NzModalModule,
  NzTableModule,
  NzImageModule,
  NzTimePickerModule,
  NzToolTipModule,
];

const components = [
  FieldComponent,
  ButtonComponent,
  ContentCardComponent,
  UploadPhotoComponent,
  TextareaComponent,
  SelectLanguageComponent,
  FieldLabelComponent,
  DatePickerComponent,
  CollapseComponent,
  ProgressGroupComponent,
  CounterComponent,
  StatisticItemComponent,
  TimePickerComponent,
  ValidationComponent,
  ConfrontationPopupComponent,
  DateRangePickerComponent,
  AlertComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, FormsModule, DirectivesModule, ...ngZorroModules],
  exports: [...ngZorroModules, ...components, DirectivesModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class UiComponentsModule {}
