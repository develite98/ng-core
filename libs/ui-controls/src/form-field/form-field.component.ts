import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'hulk-ui-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HulkFormFieldComponent {
  @Input() public title: string | undefined;
  @Input() public isRequired: boolean = false;
}
