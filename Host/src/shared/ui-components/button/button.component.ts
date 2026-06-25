import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  _loading: boolean = false;
  @Input() secondary: boolean = false;
  @Input() size: string = 'lg';
  @Input() outline: boolean = false;
  @Input() disabled: boolean = false;
  @Input() secondaryBabyBlue: boolean = false;
  @Input() set nzLoading(value: boolean) {
    this._loading = value;
  }
}
