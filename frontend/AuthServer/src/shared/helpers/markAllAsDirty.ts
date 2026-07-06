import { FormGroup } from '@angular/forms';

export function markAllAsDirty(form: FormGroup) {
  Object.keys(form.controls).forEach(key => {
    form.get(key).markAsDirty();
  });
}
