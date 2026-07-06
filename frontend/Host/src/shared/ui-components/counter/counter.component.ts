import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  forwardRef,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CounterComponent),
      multi: true,
    },
  ],
})
export class CounterComponent implements ControlValueAccessor, AfterViewInit, OnInit {
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() label: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() min = 1;

  public value: any = '';
  private onChange: any = () => {};
  private onTouched: any = () => {};

  ngAfterViewInit(): void {}

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
  increment() {
    this.value++;
    this.changeValue();
  }

  decrement() {
    if (this.value <= this.min) return;
    this.value--;
    this.changeValue();
  }
}
