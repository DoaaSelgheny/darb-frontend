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
export class FieldComponent implements ControlValueAccessor, AfterViewInit, OnInit {
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() type: string = 'text';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() label: string = '';
  @Input() control: FormControl;
  @Input() maxlength: number | null = null;
  @Input() labelOptions: ILabelOptions;
  showPassword: boolean = false;
  public value: any = '';
  private onChange: any = () => {};
  private onTouched: any = () => {};
  @ViewChild('input', { static: false }) input: ElementRef | any;
  @Output() changeInputValue: EventEmitter<string> = new EventEmitter();

  ngAfterViewInit(): void {
    this.handelEventEmitterData();
  }

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

  changeValue() {
    this.onChange(this.value);
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
}
