import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout/layout.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // {
      //   path: 'dashboard',
      //   loadChildren: () =>
      //     import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      // },
      {
        path: 'users',
        loadChildren: () =>
          import('./modules/users/users.module').then((m) => m.UsersModule),
      },
      // {
      //   path: 'reports',
      //   loadChildren: () =>
      //     import('./reports/reports.module').then((m) => m.ReportsModule),
      // },
    ],
  },
];
