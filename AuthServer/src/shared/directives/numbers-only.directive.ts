import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
  signal,
  AfterViewInit,
} from '@angular/core';
import { NgControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { el, th } from 'date-fns/locale';
import { FieldComponent } from '../ui-components/field/field.component';
import { OnDestroy } from '@angular/core';
import { ValidationComponent } from '../ui-components/validation/validation.component';
import { isNullOrEmpty } from '@abp/ng.core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ChangeData } from 'ngx-intl-tel-input-gg';
import { Observable } from 'rxjs';
import { NUMBERS_ONLY } from './validation-regex';

@Directive({
  selector: 'app-field[RealNumbersOnly]',
  standalone: false,
})
export class RealNumberDirective implements AfterViewInit {
  @Output() valueChange = new EventEmitter();
  @Input() set RealNumbersOnly(flag: boolean) {}
  array = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠'];
  regexStr = '^[a-zA-Z0-9_]+$';
  rgexp3 = '^[1-9][0-9]*$';

  protected async getInput(_el: ElementRef<any>): Promise<ElementRef> {
    let appfield = _el.nativeElement;
    let inputDiv = appfield.children[1];
    let inptGroup = inputDiv.children[0];
    let inpt = inptGroup.firstElementChild;
    return inpt;
  }
  public obs$;
  inptsgnl = signal<ElementRef<HTMLInputElement>>(null);

  constructor(private _el: ElementRef) {
    //let d = this.inptsgnl();
    this.obs$ = toObservable<ElementRef<HTMLInputElement>>(this.inptsgnl);
  }

  async ngAfterViewInit(): Promise<void> {
    let s = await this.getInput(this._el);
    await this.inptsgnl.set(s);

    //unused just test
    this.obs$.subscribe(val => {
    });
  }


  isNumberKey(event) {
    let charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  checkString(str) {
    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i].indexOf(str) > -1) {
        return true;
      }
    }

    return false;
  }

  /// .   listeners
  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    return event.preventDefault();
  }
  @HostListener('keypress', ['$event']) onKeyPress(event) {
    // return new RegExp(this.regexStr).test(event.key);
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  @HostListener('keydown', ['$event'])
  async keyDownEvent(event: KeyboardEvent) {
    // return 'event.charCode &gt;= 48 &amp;&amp; event.charCode &lt;= 57';
    //let length = event.target.value.length;
    let key = event.key;
    let target: any = event.target;
    let inptValue: ElementRef<HTMLInputElement> = await this.inptsgnl();

    //const ivalue = target.value.replace(/\s/g, '');
    // const vvalue = target.valuee;

    let s: string = target.value?.toString().substring(0, 1);

    if (s === '0') {
      (await this.getInput(this._el)).nativeElement?.setValue(null);
      return event.preventDefault();
    }
    // check zero at first
    if (key === '0' && target.value.length == 0) return event.preventDefault();

    if (isNullOrEmpty(target.value)) {
      if (key == 'Backspace') {
        (await this.getInput(this._el)).nativeElement?.setValue(null);
      }
    }
    if (key === ' ' || event.keyCode === 32) return false;
    if (this.checkString(key)) return false;
    if (event.key.length === 1 && (event.which < 48 || event.which > 57)) {
      event.preventDefault();
    }
    var keynum;
    var keychar;

    if (window.event) {
      //IE
      keynum = event.keyCode;
    }
    if (event.which) {
      //Netscape/Firefox/Opera
      keynum = event.which;
    }
    if (
      keynum == 8 ||
      keynum == 9 ||
      keynum == 46 ||
      (keynum >= 35 && keynum <= 40) ||
      (event.keyCode >= 96 && event.keyCode <= 105)
    )
      return true;

    if (keynum == 110 || keynum == 190) {
      var checkdot = target;
      var i = 0;
      for (i = 0; i < checkdot.length; i++) {
        if (checkdot[i] == '.') return false;
      }
      if (checkdot.length == 0) target.value.toString().trim = '0';
      return true;
    }
    keychar = String.fromCharCode(keynum);

    return !isNaN(keychar);
  }

  // no zeros

  @HostListener('input', ['$event']) onInputChange(event) {


    var target = event.target;

    var val = target.value;


    let s: string = target.value?.toString().substring(0, 1);


    if (s === '0') {
      event.target.value = event.target.value?.toString().substring(1);
      // this.valueChange.emit('');
      // event.stopPropagation();
    }

    async function getFirstChar(value) {
      let s: string = val.toString().substring(0, 1);
    }

  }
}
