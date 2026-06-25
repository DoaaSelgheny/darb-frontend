import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfrontationTypes } from './confrontation-types.enum';

@Component({
  selector: 'app-confrontation-popup',
  templateUrl: './confrontation-popup.component.html',
  styleUrl: './confrontation-popup.component.scss',
})
export class ConfrontationPopupComponent {
  @Input() set visible(value: boolean) {
    this.isVisible = value;
  }
  @Input() confrontationType: ConfrontationTypes = ConfrontationTypes.warning;

  @Output() cancel: EventEmitter<any> = new EventEmitter();

  @Input() title: string = '';
  @Input() description: string = '';

  isVisible: boolean = false;
  confrontationTypesEnum = ConfrontationTypes;
}
