import { Directive, ElementRef, Renderer2, Input } from '@angular/core';
import { vaidationType } from './vaidationTypeEnum';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[keypressValidation]',
})
export class onlyNumberDirective {
  @Input() keypressValidation: vaidationType = vaidationType.numberOnly;

  constructor(
    private _elRef: ElementRef,
    private _renderer: Renderer2,
  ) {}

  ngOnInit() {
    switch (this.keypressValidation) {
      case vaidationType.numberOnly:
        this._renderer.setAttribute(
          this._elRef.nativeElement,
          'onkeypress',
          'return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 0',
        );
        break;
      case vaidationType.numberwithstarOnly:
        this._renderer.setAttribute(
          this._elRef.nativeElement,
          'onkeypress',
          'return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 0 || event.charCode == 42 || event.charCode == 0',
          );
          break;
      case vaidationType.arabicOnly:
        this._renderer.setAttribute(
          this._elRef.nativeElement,
          'onkeypress',
          'return (event.charCode >= 1536 && event.charCode <= 1791) || event.charCode == 32 || event.charCode == 0',
        );
        break;
      case vaidationType.englishOnly:
        this._renderer.setAttribute(
          this._elRef.nativeElement,
          'onkeypress',
          'return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || event.charCode == 32 || event.charCode == 0',
        );
        break;
      case vaidationType.arabicAndEnglish:
        this._renderer.setAttribute(
          this._elRef.nativeElement,
          'onkeypress',
          'return ((event.charCode >= 1536 && event.charCode <= 1791) || (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || event.charCode == 32 || event.charCode == 0)',
        );
        break;
    }
  }
  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && /\s/.test(control.value)) {
        return { whitespace: true };
      }
      return null;
    };
  }
}
