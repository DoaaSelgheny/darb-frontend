import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from './pipes/pipes.module';
import { UiComponentsModule } from './ui-components/ui-components.module';
import { DirectivesModule } from './directives/directives.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, UiComponentsModule, PipesModule, DirectivesModule],
  exports: [UiComponentsModule, PipesModule, DirectivesModule],
})
export class SharedModule {}
