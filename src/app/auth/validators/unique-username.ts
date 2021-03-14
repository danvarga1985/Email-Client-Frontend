import { Injectable } from "@angular/core";
import { AsyncValidator, FormControl } from "@angular/forms";
import { of } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) { }

  /* Converted into arrow function, because this class will be referenced elsewhere, where 'this.http' will be
  undefined. The arrow function lexically binds the context to this class-instance.
  Alternate solution: in the component the method could be 'bound' (no arrow function needed):
  'this.uniqueUsername.validate.bind(this.uniqueUsername) */
  validate = (control: FormControl) => {
    const { value } = control;

    return this.authService
      .checkUsernameAvailability(value)
      .pipe(
        map(value => {
          if (value.available) {
            return null;
          }
        }),
        catchError((err) => {
          if (err.error.username) {
            return of({ uniqueUsername: false });
          } else {
            return of({ noConnection: true });
          }
        })
      );
  }
}
