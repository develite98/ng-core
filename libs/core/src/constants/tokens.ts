import { HttpErrorResponse } from '@angular/common/http';
import { InjectionToken } from '@angular/core';

export const ERROR_HANDLING_CALLBACK: InjectionToken<(response: HttpErrorResponse) => void> = new InjectionToken(
  'hulk.error-handling-callback'
);

export const AUTH_TOKEN_CALLBACK: InjectionToken<() => string> = new InjectionToken('hulk.auth-token-callback');

export interface ISpinnerCallback {
  show: () => void;
  hide: () => void;
}

export const SPINNER_CALLBACK: InjectionToken<ISpinnerCallback> = new InjectionToken('hulk.Spinner-callback');
