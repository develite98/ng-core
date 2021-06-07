import { BaseComponent, ComponentType } from './base.component';

import { Directive } from '@angular/core';

@Directive()
export abstract class BaseFormComponent<T = ComponentType> extends BaseComponent<T> {}
