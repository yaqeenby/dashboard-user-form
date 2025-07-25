import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { LayoutComponent } from './layout.component';
import { SidebarMenuItemComponent } from './components/sidebar-menu-item/sidebar-menu-item.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [LayoutComponent, SidebarMenuItemComponent],
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    MegaMenuModule,
    TieredMenuModule,
    MenuModule,
    PanelMenuModule,
    ButtonModule,
    RippleModule,
  ],
  bootstrap: [LayoutComponent],
})
export class LayoutModule {}
