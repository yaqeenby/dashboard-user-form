import { Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout/layout.component';
import { ReportComponent } from './modules/report/report.component';
import { ActiveRouteGuard } from './guards/active-route.guard';
import { ActiveRouting } from './enums/active-routing.enum';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'organization',
        loadChildren: () =>
          import('./modules/organization/organization.module').then(
            (m) => m.OrganizationModule
          ),
      },
      {
        path: 'report',
        component: ReportComponent,
        canMatch: [ActiveRouteGuard],
        data: { activeRoute: ActiveRouting.Report },
        // loadChildren: () =>
        //   import('./reports/reports.module').then((m) => m.ReportsModule),
      },
    ],
  },
];
