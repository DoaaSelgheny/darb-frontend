import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'getControl',
})
export class GetControlPipe implements PipeTransform {
  transform(form: FormGroup, controlName: string): FormControl | any {
    return form.get(controlName);
  }
}
