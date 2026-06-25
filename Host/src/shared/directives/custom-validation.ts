import { AbstractControl, ValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';
import {
  ACCOUNT_NUMBER,
  ARABIC_ENGLISH_WITH_SPACES_WITHOUT_NUMBERS,
  SAUDI_IBAN,
} from 'src/shared/directives/validation-regex';
export function noWhitespaceOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && /^\s*$/.test(control.value)) {
      return { requiredNotEmptySpace: true };
    }
    return null;
  };
}

export function arrayMinLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && control.value.length <= minLength) {
      return { required: true };
    }
    return null;
  };
}
export const requiredUploadValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const files = control.value;
  if (!files || files.length === 0) {
    return { required: true };
  }
  return null;
};

export const moneyValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (isNaN(value) || value < 1) {
    return { invalidMoney: true };
  }
  return null;
};

export const substringValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const accountNumber = control.value;
  const ibanNumber = control?.parent?.get('ibanNumber')?.value;

  const endingSubstring = ibanNumber?.slice(-accountNumber.length);
  // don't show error when iban field is empty
  if (!endingSubstring) {
    return null;
  }
  return accountNumber !== endingSubstring ? { nonMatching: true } : null;
};
