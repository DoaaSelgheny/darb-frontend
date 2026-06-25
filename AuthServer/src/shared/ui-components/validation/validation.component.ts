import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.scss',
})
export class ValidationComponent {
  @Input() control: FormControl = new FormControl();
  @Input() message: string = '';
  @Input() suppressValidation: string[] = [];
  @Input() suppressValidationWithMessage:Record<string, string>;
  ngOnInit(): void {}

  getErrors() {
    if (this.control.errors) {
      return Object.keys(this.control.errors);
    }
    return [];
  }
  getSuppressMessage(error: string): string | null {
    return this.suppressValidationWithMessage?.[error] || null;
  }
}
