import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { MessageService } from 'primeng/api';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectModule } from 'primeng/select';
import { InputMaskModule } from 'primeng/inputmask';
import { Fluid } from 'primeng/fluid';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [UsersComponent, AddUserComponent, UsersListComponent],
  imports: [
    UsersRoutingModule,
    ToggleSwitchModule,
    SelectModule,
    InputMaskModule,
    Fluid,
    SharedModule,
  ],
  bootstrap: [UsersComponent],
})
export class UsersModule {}
