import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HulkRichTextEditorComponent } from './rich-text-editor.component';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [HulkRichTextEditorComponent],
  imports: [CommonModule, QuillModule.forRoot(), NzIconModule, FormsModule],
  providers: [NzModalService],
  exports: [HulkRichTextEditorComponent]
})
export class HulkRichTextEditorModule {}
