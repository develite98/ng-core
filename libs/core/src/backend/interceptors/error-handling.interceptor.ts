import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { BaseInterceptor } from '../base-interceptor';
import { ERROR_HANDLING_CALLBACK } from '../../constants/tokens';
import { FW_HANDLE_ERROR } from '../base-backend.service';
import { InterceptorType } from '../interceptor-registry';
import { catchError } from 'rxjs/operators';

export enum HttpStatusCode {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  BADREQUEST = 400,
  BADGATEWAY = 502
}

@Injectable()
export class ErrorHandlingInterceptor extends BaseInterceptor {
  protected key: string = InterceptorType.ErrorHandling;
  private shouldHandleError: boolean = true;

  constructor(protected injector: Injector) {
    super(injector);
  }

  public handle(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (this.shouldHandleError) {
          this.handleError(error);
        }

        return throwError(error);
      })
    );
  }

  protected handleConnectionError(errorMessage: string): void {
    this.showError(errorMessage);
  }

  protected processHeaders(headers: HttpHeaders): void {
    this.shouldHandleError = headers.get(FW_HANDLE_ERROR) === 'true';
  }

  private handleError(response: HttpErrorResponse): void {
    switch (response.status) {
      case HttpStatusCode.UNAUTHORIZED:
        break;
      case HttpStatusCode.FORBIDDEN:
        break;
      case HttpStatusCode.BADREQUEST:
        break;
      case HttpStatusCode.BADGATEWAY:
        break;
      default:
        break;
    }
  }

  private showError(message: string): void {
    const errorHandlingCallback: ((message: string) => void) | null = this.injector.get(ERROR_HANDLING_CALLBACK, null);

    if (errorHandlingCallback) {
      errorHandlingCallback(message);
    }
  }
}
