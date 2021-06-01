import { Directive, Input } from '@angular/core';

import { FormGroupDirective } from '@angular/forms';

@Directive({ selector: '[hulkCoreFormViewModel]' })
export class FormViewModelDirective {
  @Input()
  // Disable this rule for bypass function form.patchValue forwarder.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public set hulkCoreFormViewModel(value: any) {
    if (value) {
      this.formGroupDirective.form.patchValue(value);
      this.formGroupDirective.form.markAsPristine();
    }
  }

  constructor(private formGroupDirective: FormGroupDirective) {}
}
