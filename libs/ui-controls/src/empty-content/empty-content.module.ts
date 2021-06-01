import { CommonModule } from '@angular/common';
import { HulkEmptyContentComponent } from './empty-content.component';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [HulkEmptyContentComponent],
  imports: [CommonModule, NzButtonModule, NzIconModule],
  exports: [HulkEmptyContentComponent]
})
export class HulkEmptyContentModule {}
