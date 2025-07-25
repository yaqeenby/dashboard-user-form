import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { KnobModule } from 'primeng/knob';
import { CardModule } from 'primeng/card';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MetricCardComponent } from './components/metric-card/metric-card.component';
import { SharedModule } from '../shared/shared.module';
import { ShiftsHistoryComponent } from './components/shifts-history/shifts-history.component';
import { ShiftDetailsComponent } from './components/shift-details/shift-details.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MetricCardComponent,
    ShiftDetailsComponent,
    ShiftsHistoryComponent,
  ],
  imports: [DashboardRoutingModule, KnobModule, CardModule, SharedModule],
  bootstrap: [DashboardComponent],
})
export class DashboardModule {}
