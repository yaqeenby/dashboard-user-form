import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ActiveRouteGuard } from '../../../guards/active-route.guard';
import { ActiveRouting } from '../../../enums/active-routing.enum';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [{ path: 'add', component: AddUserComponent }],
    canMatch: [ActiveRouteGuard],
    data: { activeRoute: ActiveRouting.Users },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
