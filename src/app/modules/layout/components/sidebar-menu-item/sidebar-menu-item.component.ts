import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActiveRoutingService } from '../../../../services/active-routing.service';

@Component({
  selector: 'app-sidebar-menu-item',
  templateUrl: './sidebar-menu-item.component.html',
  styleUrl: './sidebar-menu-item.component.scss',
  standalone: false,
})
export class SidebarMenuItemComponent {
  @Input() variant: 'big' | 'small' | 'mobile' | 'shortcut' = 'big';
  @Input() item: MenuItem | undefined;
  @Input() selected: boolean = false;
  expandedItemId: string | null = null;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.expandedItemId = null;
    }
  }
  constructor(
    public activeRoutingService: ActiveRoutingService,
    private eRef: ElementRef
  ) {}

  onClickItem(event: Event, item: MenuItem) {
    console.log(item);
    if (item.command) {
      item.command({ originalEvent: event, item });
    }

    this.toggleItem(this.item);
  }

  toggleItem(item: any) {
    if (
      this.variant == 'small' &&
      this.item?.items &&
      this.item?.items.length
    ) {
      this.expandedItemId = this.expandedItemId === item.id ? null : item.id;
    }
  }

  isExpanded(item: any): boolean {
    return this.expandedItemId === item.id;
  }

  navigate(sub: any) {
    if (sub.command) {
      sub.command();
    }
  }
}
