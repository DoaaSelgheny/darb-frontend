import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { UiComponentsModule } from '../../../../shared/ui-components/ui-components.module';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [],
  imports: [CommonModule, UiComponentsModule, PipesModule, RecaptchaModule],
  exports: [UiComponentsModule, PipesModule, RecaptchaModule],
})
export class SharedModule {}
