import { ComponentStore } from '@ngrx/component-store';
import { IBaseState } from '../bases/stores';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// The state model
export type ISpinnerState = IBaseState<boolean>;

@Injectable()
export class SpinnerStore extends ComponentStore<ISpinnerState> {
  // SELECTORS
  public readonly data$: Observable<boolean> = this.select((state: ISpinnerState) => state.data);

  // UPDATERS
  public readonly show: () => void = this.updater((state: ISpinnerState) => ({
    ...state,
    data: true
  }));

  public readonly hide: () => void = this.updater((state: ISpinnerState) => ({
    ...state,
    data: false
  }));

  constructor() {
    super({
      data: false,
      status: 'Pending',
      errors: []
    });
  }
}
