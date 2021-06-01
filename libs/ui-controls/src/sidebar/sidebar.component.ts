import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface ISidebarMenuItem {
  title?: string;
  icon?: string;
  action?: () => void;
  children?: ISidebarMenuItem[];
  disabled?: boolean;
}

@Component({
  selector: 'hulk-ui-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HulkSidebarComponent {
  @Input() public menuItems: ISidebarMenuItem[] = [];

  public isExpanded: boolean = true;

  public toggle(): void {
    this.isExpanded = !this.isExpanded;
  }

  public handleClick(item: ISidebarMenuItem): void {
    if (!item.action) {
      return;
    }

    item.action();
  }
}
