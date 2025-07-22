import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActiveRouting } from '../../enums/active-routing.enum';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
