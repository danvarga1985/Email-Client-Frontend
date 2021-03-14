import { Injectable } from '@angular/core';
import { FormGroup, Validator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MatchPassword implements Validator {
  // AbstractControl - can be a FormGroup or a FormControl
  validate(formGroup: FormGroup) {
    const { password, passwordConfirmation } = formGroup.value;

    if (password === passwordConfirmation) {
      // Password match
      return null;
    } else {
      // Password mismatch
      return { passwordMismatch: true };
    }
  }
}
