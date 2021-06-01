import { HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { BaseInterceptor } from '../base-interceptor';
import { InterceptorType } from '../interceptor-registry';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor extends BaseInterceptor {
  protected key: string = InterceptorType.Authentication;

  constructor(protected injector: Injector) {
    super(injector);
  }

  public handle(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken: string = '';

    if (accessToken) {
      const headers: HttpHeaders = req.headers.set('Authorization', `Bearer ${accessToken}`);

      req = req.clone({ headers });
    }

    return next.handle(req);
  }
}
