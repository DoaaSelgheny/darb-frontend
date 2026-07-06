import { FormGroup } from '@angular/forms';

export const markControlAsDisabled = (formGroup: FormGroup) => {
  Object.values(formGroup.controls).forEach(control => control.disable());
};
