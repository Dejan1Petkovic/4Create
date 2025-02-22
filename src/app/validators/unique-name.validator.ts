import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { UserService } from '../services/user.service';
import { timer, Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

export function uniqueNameValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(300).pipe(
      switchMap(() => userService.isNameUnique(control.value)),
      tap(isUnique => console.log('Is name unique:', isUnique)),
      map(isUnique => (isUnique ? null : { unique: true })),
      // Handle setting errors on the control manually instead of returning the error object
      // Angular doesn't handle the error object correctly when it's returned from an async validator
      tap(validationResult => handleValidationResult(control, validationResult))
    );
  };
}

// Function to handle setting errors on the control
function handleValidationResult(control: AbstractControl, validationResult: ValidationErrors | null): void {
  if (validationResult) {
    control.setErrors(validationResult);
    control.markAsTouched();
  } else {
    control.setErrors(null);
  }
}