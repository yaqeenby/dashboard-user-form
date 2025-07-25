import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { ActiveRouteGuard } from '../../../guards/active-route.guard';
import { ActiveRouting } from '../../../enums/active-routing.enum';
import { UsersListComponent } from './pages/users-list/users-list.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: 'list', component: UsersListComponent },
      { path: 'add', component: AddUserComponent },
    ],
    canMatch: [ActiveRouteGuard],
    data: { activeRoute: ActiveRouting.Users },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
