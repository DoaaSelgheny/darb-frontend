import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.scss',
})
export class ValidationComponent implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() message: string = '';
  @Input() suppressValidation: string[] = [];
  @Input() suppressValidationWithMessage:Record<string, string>;
  ngOnInit(): void {
    this.control.valueChanges.subscribe(res => {});

  }

  getErrors(): string[] | null {
    if (this.control?.errors) {
      return Object.keys(this.control.errors).filter(e => !this.suppressValidation.includes(e));
    }
    return null;
  }


  getSuppressMessage(error: string): string | null {
    return this.suppressValidationWithMessage?.[error] || null;
  }

}
