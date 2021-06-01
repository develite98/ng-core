import { DEFAULT_INTERCEPTORS, InterceptorRegistry } from './interceptor-registry';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

// Interceptors
export const FW_INTERCEPTOR_KEYS: string = 'FW-Interceptor-Keys';
export const FW_DISPLAY_SPINNER: string = 'FW-Display-Spinner';
export const FW_HANDLE_ERROR: string = 'FW-Handle-Error';

export declare type GetParamType = string | boolean | number;

export interface IGetParams {
  [param: string]: GetParamType | GetParamType[] | IGetParams;
}

export interface IHttpOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  observe?: 'body';
  responseType?: 'json';
}

export abstract class BaseBackendService {
  protected get apiUrl(): string {
    return '';
  }

  private _interceptorRegistry: InterceptorRegistry = new InterceptorRegistry(DEFAULT_INTERCEPTORS);

  constructor(protected http: HttpClient) {}

  public get<TResponse>(
    url: string,
    params: IGetParams | null,
    shouldShowSpinner: boolean = true,
    shouldHandleError: boolean = true
  ): Observable<TResponse> {
    return this.http.get<TResponse>(
      `${this.apiUrl}${url}`,
      this.getHttpOptions(shouldShowSpinner, this.preprocessData(params), shouldHandleError)
    );
  }

  public post<TBody, TResponse>(
    url: string,
    body: TBody,
    shouldShowSpinner: boolean = true,
    additionalHttpOptions?: Partial<IHttpOptions>,
    shouldHandleError: boolean = true
  ): Observable<TResponse> {
    return this.http.post<TResponse>(`${this.apiUrl}${url}`, this.preprocessData(body), <IHttpOptions>{
      ...this.getHttpOptions(shouldShowSpinner, null, shouldHandleError),
      ...additionalHttpOptions
    });
  }

  public put<TBody, TResponse>(
    url: string,
    body: TBody,
    shouldShowSpinner: boolean = true,
    shouldHandleError: boolean = true
  ): Observable<TResponse> {
    return this.http.put<TResponse>(
      `${this.apiUrl}${url}`,
      this.preprocessData(body),
      this.getHttpOptions(shouldShowSpinner, null, shouldHandleError)
    );
  }

  public delete<TResponse>(url: string, shouldShowSpinner: boolean = true, shouldHandleError: boolean = true): Observable<TResponse> {
    return this.http.delete<TResponse>(`${this.apiUrl}${url}`, this.getHttpOptions(shouldShowSpinner, null, shouldHandleError));
  }

  /**
   * Override this method to set or replace interceptors for current service scope.
   */
  protected onFilterInterceptors(registry: InterceptorRegistry): InterceptorRegistry {
    return registry;
  }

  /**
   * This function will pass the internal headers for checking which interceptors will be run.
   * @see BaseInterceptor
   */
  protected getHttpOptions(shouldShowSpinner: boolean, params: IGetParams | null, shouldHandleError: boolean = true): IHttpOptions {
    return {
      headers: {
        [FW_DISPLAY_SPINNER]: shouldShowSpinner.toString(),
        [FW_INTERCEPTOR_KEYS]: this.onFilterInterceptors(this._interceptorRegistry).toJSON(),
        [FW_HANDLE_ERROR]: shouldHandleError.toString()
      },
      params: this.parseHttpGetParam(params)
    };
  }

  /**
   * We remove all null props because it's not necessary. And in server dotnet core, if the data is nullable => default value is null
   * so that do not need to submit null. If data is not nullable, then if submit null can raise exception.
   */
  private preprocessData<T>(data: T): T {
    return data;
  }

  private flattenHttpGetParam(inputParams: IGetParams | null, returnParam: IGetParams = {}, prefix?: string): IGetParams {
    if (inputParams != null) {
      for (const paramKey in inputParams || {}) {
        const inputParamValue: GetParamType | GetParamType[] | IGetParams = inputParams[paramKey];
        const inputParamFinalKey: string = prefix ? `${prefix}.${paramKey}` : paramKey;
        if (inputParamValue instanceof Array) {
          returnParam[inputParamFinalKey] = inputParamValue;
        } else if (typeof inputParamValue === 'object') {
          this.flattenHttpGetParam(inputParamValue, returnParam, paramKey);
        } else if (inputParamValue != null) {
          returnParam[inputParamFinalKey] = inputParamValue.toString();
        }
      }
    }

    return returnParam;
  }

  private parseHttpGetParam(inputParams: IGetParams | null): HttpParams {
    let returnParam: HttpParams = new HttpParams();
    const flattenedInputParams: IGetParams = this.flattenHttpGetParam(inputParams);
    for (const paramKey in flattenedInputParams) {
      if (Object.prototype.hasOwnProperty.call(flattenedInputParams, paramKey)) {
        const inputParamValue: GetParamType | GetParamType[] | IGetParams = flattenedInputParams[paramKey];
        if (inputParamValue instanceof Array) {
          inputParamValue.forEach((p: GetParamType) => {
            returnParam = returnParam.append(paramKey, p.toString());
          });
        } else {
          returnParam = returnParam.append(paramKey, inputParamValue.toString());
        }
      }
    }

    return returnParam;
  }
}
