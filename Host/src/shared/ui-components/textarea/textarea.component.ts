import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent {
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() label: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() changeRow:boolean = false;
  @Input() suppressValidation: string[] = [];
  @Input() suppressValidationWithMessage: Record<string, string>;
  showPassword: boolean = false;
  public value: any = '';
  private onChange: any = () => {};
  private onTouched: any = () => {};
  @Output() changeInputValue: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {}
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  changeValue(event) {
    this.onChange(this.value);
    if(this.changeRow){
      this.adjustRows(event)
    }
  }
  rows: number = 1; // Default number of rows

  adjustRows(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;

    // Reset the rows to 1 to re-measure height
    textarea.rows = 1;

    // Dynamically set the rows based on scroll height
    const scrollHeight = textarea.scrollHeight;
    const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight, 10);

    // Calculate the number of rows based on scroll height
    this.rows = Math.ceil(scrollHeight / lineHeight);

    // Apply the calculated rows to the textarea
    textarea.rows = this.rows;
    console.log(this.rows)
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  setReadOnlyState?(isReadOnly: boolean): void {
    this.readonly = isReadOnly;
  }
}
