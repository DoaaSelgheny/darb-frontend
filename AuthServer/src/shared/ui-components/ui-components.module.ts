import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FieldComponent } from './field/field.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';

import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
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

import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { ValidationComponent } from './validation/validation.component';
import { CoreModule } from '@abp/ng.core';

const ngZorroModules = [
  NzButtonModule,
  NzRadioModule,
  NzIconModule,

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
  NzRateModule,
  NzImageModule,
  NzMenuModule,
  CommonModule,
  NzModalModule,
  NzCollapseModule
];

const components = [
  FieldComponent,
  ButtonComponent,
  SelectLanguageComponent,
  FieldLabelComponent,
  ValidationComponent,
];

@NgModule({
  declarations: [...components],
  imports: [FormsModule, ...ngZorroModules, CoreModule],
  exports: [...ngZorroModules, ...components, CoreModule],
})
export class UiComponentsModule {}
