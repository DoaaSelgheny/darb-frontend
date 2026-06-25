import { HttpErrorResponse } from '@angular/common/http';
import { Injector } from '@angular/core';
import { ToasterService } from 'src/shared/services/toaster.service';

export function handleHttpErrors(injector: Injector, httpError: HttpErrorResponse) {
  if (!!httpError.status) {
    const toaster = injector.get(ToasterService);
    const ERROR_MESSAGE = httpError.error.error?.details
      ? httpError.error.error?.details
      : httpError.error.error[0]?.message;
    toaster.error(ERROR_MESSAGE);
    return;
  }
}
