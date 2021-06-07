import { Observable, Subscription } from 'rxjs';

export type BaseEffectType<T> = (observableOrValue: T | Observable<T>) => Subscription;

export type BaseStoreViewModel<T, U = IErrorMessage> = Observable<IBaseState<T, U>>;

export type StateStatus = 'Pending' | 'Loading' | 'Success' | 'Error';
export interface IErrorMessage {
  code: string;
  message: string;
}

export interface IBaseState<T, U = IErrorMessage> {
  data: T;
  status: StateStatus;
  errors: U[];
}
