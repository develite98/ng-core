import { CommonModule } from '@angular/common';
import { HulkFormFieldComponent } from './form-field.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [HulkFormFieldComponent],
  imports: [CommonModule],
  exports: [HulkFormFieldComponent]
})
export class HulkFormFieldModule {}
