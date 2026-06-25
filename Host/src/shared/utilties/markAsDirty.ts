import { FormGroup } from '@angular/forms';

export const markControlsAsDirty = (formGroup: FormGroup) => {
  Object.values(formGroup.controls).forEach(control => control.markAsDirty());
};
