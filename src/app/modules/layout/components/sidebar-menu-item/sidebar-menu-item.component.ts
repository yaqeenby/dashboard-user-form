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
  //   big menu
  // padding 5px 15px | gap 20 | icon 32 32 | radius 10px | fs 12px | row

  // small menu
  // padding not set | gap 10 | icon 48 48 | radius 15px | fs 12px | flex-column

  // mobile menu
  // padding 5px 15px | gap 20 | icon 32 32 | radius 10px | fs 13px -> selected 12px | row

  // shortcut
  // padding 10px 0px | gap 5 | icon 48 48 | radius 15px | fs 12px | row

  @Input() variant: 'big' | 'small' | 'mobile' | 'shortcut' = 'big';
  @Input() item: MenuItem | undefined;
  @Input() selected: boolean = false;

  constructor(public activeRoutingService: ActiveRoutingService) {}
}
