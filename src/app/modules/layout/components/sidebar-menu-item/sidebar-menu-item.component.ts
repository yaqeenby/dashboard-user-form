import { Component, Input } from '@angular/core';
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

  constructor(public activeRoutingService: ActiveRoutingService) {}
}
