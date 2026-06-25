import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from './pipes/pipes.module';
import { UiComponentsModule } from './ui-components/ui-components.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, UiComponentsModule, PipesModule],
  exports: [UiComponentsModule, PipesModule],
})
export class SharedModule {}
