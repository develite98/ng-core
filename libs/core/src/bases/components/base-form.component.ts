import { BaseComponent, ComponentType } from './base.component';

import { Directive } from '@angular/core';

@Directive()
export abstract class BaseFormComponent<T extends ComponentType> extends BaseComponent<T> {}
