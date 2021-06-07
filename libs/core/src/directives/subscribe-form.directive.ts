import { Directive, Input } from '@angular/core';

import { FormGroupDirective } from '@angular/forms';

@Directive({ selector: '[subscribeForm]' })
export class FormViewModelDirective<T = unknown> {
  @Input()
  public set subscribeForm(value: T) {
    if (value) {
      this.formGroupDirective.form.patchValue(value);
      this.formGroupDirective.form.markAsPristine();
    }
  }

  constructor(private formGroupDirective: FormGroupDirective) {}
}
