import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { en_US, NzI18nService, ar_EG} from 'ng-zorro-antd/i18n';
import {  LocalizationService } from '@abp/ng.core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements ControlValueAccessor {
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() label: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() classes: string = '';
  @Input() placeholder: string = '';
  @Input() disabledDate: void;
  @Input() nzDefaultValue: Date = null;
  @Input() showToday:boolean=true;
  
  lang:string;
  
  constructor(private i18n: NzI18nService,private localizationService:LocalizationService) {}

  ngOnInit() {
    this.lang=this.localizationService.currentLang;
    if(this.lang=="ar"){
      this.i18n.setLocale(ar_EG);
    }else{
      this.i18n.setLocale(en_US);
    }
  }
  public value: any = '';
  private onChange: any = () => {};
  private onTouched: any = () => {};
  dateFormat = 'dd/MM/yyyy';

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
}
