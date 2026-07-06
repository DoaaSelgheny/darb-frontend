import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, fromEvent } from 'rxjs';
import { ILabelOptions } from 'src/shared/models/labelOptions';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldComponent),
      multi: true,
    },
  ],
})
export class FieldComponent implements ControlValueAccessor, AfterViewInit {
  handleKeyDonw() {
    throw new Error('Method not implemented.');
  }
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() type: string = 'text';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() noEmptyString: boolean = true;
  @Input() label: string = '';
  @Input() control: FormControl;
  @Input() maxlength: number | null = null;
  @Input() minlength: number | null = null;
  @Input() labelOptions: ILabelOptions;
  @Input() clipboard: boolean = false;
  @Input() isNonZeroFirstInput: boolean = false;
  @Input() suppressValidation: string[] = [];
  @Input() suppressValidationWithMessage: Record<string, string>;

  showPassword: boolean = false;
  public value: any = '';
  private preValue: any = '';

  private onChange: any = () => {};
  private onTouched: any = () => {};
  @ViewChild('input', { static: false }) input: ElementRef | any;
  @Output() changeInputValue: EventEmitter<string> = new EventEmitter();
  @Output() changeInputValueWithPreValue = new EventEmitter<any>();
  @Output() copyToClipboard: EventEmitter<string> = new EventEmitter();

  ngAfterViewInit(): void {
    let inputValue = this.input.nativeElement.value;
    inputValue = inputValue == '0' ? '' : inputValue;

    this.handelEventEmitterData();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  changeValue() {
    if (this.noEmptyString && this.value == '') this.value = null;

    this.onChange(this.value);

    if (this.changeInputValueWithPreValue) {
      this.changeInputValueWithPreValue.emit({ prev: this.preValue, current: this.value });
      setTimeout(() => {
        this.preValue = this.value;
      }, 10);
    }
    this.preValue = this.value;

  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  setReadOnlyState?(isReadOnly: boolean): void {
    this.readonly = isReadOnly;
  }

  handelEventEmitterData() {
    fromEvent(this.input.nativeElement, 'input')
      .pipe(debounceTime(750))
      .subscribe(res => {
        this.changeInputValue.emit(this.value);
      });
  }
  handleCopy(value) {
    navigator.clipboard.writeText(value);
    this.copyToClipboard.emit(value);
  }
  nonZeroFirstInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;


    if (this.isNonZeroFirstInput && inputElement.value.startsWith('0')) {

      // Clear the input if it starts with zero
      inputElement.value = '';
      this.value = ''; // Also clear the model if using [(ngModel)]
    }
  }


}
