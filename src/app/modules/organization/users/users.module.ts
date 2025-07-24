import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Fluid } from 'primeng/fluid';
import { ButtonModule } from 'primeng/button';
import { UsersListComponent } from './users-list/users-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [UsersComponent, AddUserComponent, UsersListComponent],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    FileUpload,
    ToggleSwitchModule,
    InputIcon,
    InputTextModule,
    IconField,
    SelectModule,
    InputMaskModule,
    Fluid,
    ButtonModule,
    SharedModule,
  ],
  providers: [MessageService],
  bootstrap: [UsersComponent],
})
export class UsersModule {}
