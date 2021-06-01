import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'hulk-ui-empty-content',
  templateUrl: './empty-content.component.html',
  styleUrls: ['./empty-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HulkEmptyContentComponent {
  @Input() public placeholder: string = '';
  @Input() public buttonText: string = '';
  @Output() public buttonClickEvent: EventEmitter<string> = new EventEmitter<string>();

  public handleButtonClick() {
    this.buttonClickEvent.emit();
  }
}
