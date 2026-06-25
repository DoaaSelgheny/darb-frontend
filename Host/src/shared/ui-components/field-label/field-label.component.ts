import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ILabelOptions } from 'src/shared/models/labelOptions';

@Component({
  selector: 'app-field-label',
  templateUrl: './field-label.component.html',
  styleUrl: './field-label.component.scss',
})
export class FieldLabelComponent {
  @Input() label: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() options: ILabelOptions;
  @Input() classLabelOverride: string;
}
