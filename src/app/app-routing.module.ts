import { Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout/layout.component';

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
      // {
      //   path: 'reports',
      //   loadChildren: () =>
      //     import('./reports/reports.module').then((m) => m.ReportsModule),
      // },
    ],
  },
];
