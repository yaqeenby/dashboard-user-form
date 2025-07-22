import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { KnobModule } from 'primeng/knob';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { MenuModule } from 'primeng/menu';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    RouterModule,
    DashboardRoutingModule,
    RouterModule,
    FormsModule,
    ButtonModule,
    KnobModule,
    CardModule,
    CommonModule,
    TableModule,
    Tag,
    InputTextModule,
    IconField,
    InputIcon,
    MenuModule,
  ],
  bootstrap: [DashboardComponent],
})
export class DashboardModule {}
