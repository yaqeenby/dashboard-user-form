import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActiveRouting } from '../../enums/active-routing.enum';
import { InvoiceComponent } from './invoice/invoice.component';
import { ActiveRouteGuard } from '../../guards/active-route.guard';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'invoice',
    component: InvoiceComponent,
    canMatch: [ActiveRouteGuard],
    data: { activeRoute: ActiveRouting.Invoice },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
