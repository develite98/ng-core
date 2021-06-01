import { InjectionToken } from '@angular/core';

export const ERROR_HANDLING_CALLBACK: InjectionToken<(message: string) => void> = new InjectionToken('hulk.error-handling-callback');
