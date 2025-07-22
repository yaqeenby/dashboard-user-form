import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ActiveRouteGuard } from '../../guards/active-route.guard';
import { ActiveRouting } from '../../enums/active-routing.enum';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canMatch: [ActiveRouteGuard],
    data: { activeRoute: ActiveRouting.Dashboard },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
