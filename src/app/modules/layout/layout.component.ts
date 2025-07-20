import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Tag } from 'primeng/tag';
import { TieredMenuModule } from 'primeng/tieredmenu';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    MegaMenuModule,
    TieredMenuModule,
    IconField,
    InputIcon,
    MenuModule,
    PanelMenuModule,
    ButtonModule,
    Tag,
  ],
})
export class LayoutComponent {
  isCollapsed = false;
  showMobileSidebar = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMobileSidebar() {
    this.showMobileSidebar = !this.showMobileSidebar;
  }

  activeLabel = 'Dashboard';
  itemsn: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: '../assets/icons/dashboard.svg',
      command: () => (this.activeLabel = 'Dashboard'),
      items: [],
    },
    {
      label: 'Report',
      icon: '../assets/icons/reports.svg',
      command: () => (this.activeLabel = 'Report'),
      items: [],
    },
    {
      label: 'Organization',
      icon: '../assets/icons/organization.svg',
      command: (item: MenuItem) => (item.expanded = !item.expanded),
      items: [
        {
          label: 'Invoice',
          icon: '../assets/icons/invoice.svg',
          command: () => (this.activeLabel = 'Invoice'),
        },
        {
          label: 'Users',
          icon: '../assets/icons/users.svg',
          command: () => (this.activeLabel = 'Users'),
          action: {
            icon: '../assets/icons/plus.svg',
            link: '/users/add',
          },
        },
      ],
    },
  ];

  isActive(label: string): boolean {
    return this.activeLabel === label;
  }

  activeIndexes: number[] = [];

  isItemCollabsed(index: number) {
    return this.activeIndexes.includes(index);
  }
}
