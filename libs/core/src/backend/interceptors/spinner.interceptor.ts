import { HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { BaseInterceptor } from '../base-interceptor';
import { FW_DISPLAY_SPINNER } from '../base-backend.service';
import { InterceptorType } from '../interceptor-registry';
import { Observable } from 'rxjs';

@Injectable()
export class SpinnerInterceptor extends BaseInterceptor {
  protected key: string = InterceptorType.Spinner;
  private isDisplay: boolean = false;

  constructor(protected injector: Injector) {
    super(injector);
  }

  public handle(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.isDisplay) {
      // this.globalSpinnerService.show();

      return next.handle(req);
    }

    return next.handle(req);
  }

  protected processHeaders(headers: HttpHeaders): void {
    this.isDisplay = headers.get(FW_DISPLAY_SPINNER) === 'true';
  }

  protected finalize(): void {
    this.isDisplay = false;
    // this.globalSpinnerService.hide();
  }
}
