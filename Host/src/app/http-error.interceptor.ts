import { HttpErrorResponse } from '@angular/common/http';
import { Injector } from '@angular/core';
import { TosterService } from 'src/shared/services/toster.service';

export function handleHttpErrors(injector: Injector, httpError: HttpErrorResponse) {
  if (!!httpError.status) {
    const toaster = injector.get(TosterService);
    const ERROR_MESSAGE = httpError.error.error.details
      ? httpError.error.error.details
      : httpError.error.error.message;
    toaster.error(ERROR_MESSAGE);
    return;
  }
}
