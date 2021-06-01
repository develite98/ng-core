import { CommonModule } from '@angular/common';
import { HulkSidebarComponent } from './sidebar.component';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@NgModule({
  imports: [CommonModule, NzIconModule, NzMenuModule],
  declarations: [HulkSidebarComponent],
  providers: [],
  exports: [HulkSidebarComponent]
})
export class HulkSidebarModule {}
