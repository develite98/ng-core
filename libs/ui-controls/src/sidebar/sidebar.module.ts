import { CommonModule } from '@angular/common';
import { HulkSidebarComponent } from './sidebar.component';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule, NzIconModule, NzMenuModule],
  declarations: [HulkSidebarComponent],
  providers: [],
  exports: [HulkSidebarComponent]
})
export class HulkSidebarModule {}
