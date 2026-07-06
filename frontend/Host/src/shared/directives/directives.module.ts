import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { onlyNumberDirective } from './number-only.directive';
import { RealNumberDirective } from './numbers-only.directive';

@NgModule({
  declarations: [onlyNumberDirective, RealNumberDirective],
  imports: [CommonModule],
  exports: [onlyNumberDirective, RealNumberDirective],
})
export class DirectivesModule {}
