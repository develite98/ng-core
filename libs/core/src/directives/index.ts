import { FormViewModelDirective } from './subscribe-form.directive';
import { NgHideDirective } from './ng-hide.directive';
import { NgShowDirective } from './ng-show.directive';
import { Type } from '@angular/core';

export { FormViewModelDirective, NgHideDirective, NgShowDirective };
export const CORE_DIRECTIVES: Type<unknown>[] = [FormViewModelDirective, NgHideDirective, NgShowDirective];
