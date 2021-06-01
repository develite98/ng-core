import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  forwardRef
} from '@angular/core';
import { ContentChange, QuillEditorComponent } from 'ngx-quill';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'hulk-ui-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HulkRichTextEditorComponent),
      multi: true
    }
  ]
})
export class HulkRichTextEditorComponent {
  @Input() public theme: 'snow' | 'bubble' = 'snow';
  @Input() public html: string | undefined;
  @Input() public placeHolder: string | undefined;
  @Input() public height: string = '200px';

  @Output() public dataChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('editor') public editorElement?: TemplateRef<QuillEditorComponent>;

  constructor(private modalService: NzModalService, private changeDetectorRef: ChangeDetectorRef) {}

  //#region NG VALUE ACCESSOR
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onChange = (value: string) => undefined;

  public onTouched = () => undefined;

  public writeValue(value: string): void {
    this.html = value;
    this.onChange(value);
  }

  public registerOnChange(fn: (value: string) => undefined): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => undefined): void {
    this.onTouched = fn;
  }
  //#endregion

  public toggleFullscreen(): void {
    if (this.editorElement) {
      const elem: HTMLElement = document.documentElement;
      elem.requestFullscreen();

      const fullScreenModal: NzModalRef = this.modalService.create({
        nzCloseIcon: undefined,
        nzContent: this.editorElement,
        nzStyle: { width: '100vw', top: '0' },
        nzBodyStyle: { overflow: 'auto', height: 'fit-content' },
        nzFooter: [
          {
            label: 'Thu nhỏ',
            type: 'primary',
            onClick: () => {
              document.exitFullscreen();
              fullScreenModal.destroy();
              this.changeDetectorRef.detectChanges();
            }
          }
        ]
      });
    }
  }

  public handleContentChange(data: ContentChange) {
    if (data?.html) {
      this.html = data.html;
      this.onChange(this.html);
    }
  }
}
