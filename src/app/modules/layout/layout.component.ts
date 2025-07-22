import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ActiveRoutingService } from '../../services/active-routing.service';
import { ActiveRouting } from '../../enums/active-routing.enum';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: false,
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  showMobileSidebar = false;
  ActiveRouting = ActiveRouting;
  constructor(
    private router: Router,
    public activeRoutingService: ActiveRoutingService
  ) {}

  ngOnInit(): void {
    this.activeRoutingService.activeRouteChanged.subscribe((res) => {
      if (this.showMobileSidebar) this.toggleMobileSidebar();
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMobileSidebar() {
    this.showMobileSidebar = !this.showMobileSidebar;
  }

  isActive(id: string): boolean {
    return this.activeRoutingService.activeRoute === id;
  }
}
