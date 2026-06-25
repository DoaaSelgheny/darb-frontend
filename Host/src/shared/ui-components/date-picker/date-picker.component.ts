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
  isEnglish = false;
  lang:string;
  constructor(private i18n: NzI18nService,private localizationService:LocalizationService) {}

  ngOnInit() {
    this.lang=this.localizationService.currentLang;
    if(this.lang=="ar"){
      this.i18n.setLocale(ar_EG);
    }else{
      this.i18n.setLocale(en_US);
    }
    if(!this.dateFormat ||this.dateFormat=='')
      this.dateFormat='dd/MM/yyyy'

    
  }
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() label: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() classes: string = '';
  @Input() placeholder: string = '';
  @Input() disabledDate =(current: Date): boolean => {
    const today = new Date();
    // Remove time part from both dates to compare only dates
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return current && current < todayStart;
  };;
  @Input() nzDefaultValue: Date = null;
  @Input() showToday:boolean=true;
  @Input() showTime:boolean=false;
  @Input() isDisabledSecond:boolean=false;
  @Input() min:Date=new Date();
  public value: any = '';
  private onChange: any = () => {};
  private onTouched: any = () => {};
  @Input() dateFormat:string ='';

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
