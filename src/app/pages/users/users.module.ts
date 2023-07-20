import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AddEditUsersComponent } from './add-edit-users/add-edit-users.component';
import { ListUsersComponent } from './list-users/list-users.component';


@NgModule({
  declarations: [
    AddEditUsersComponent,
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  exports: [

  ]
})
export class UsersModule { }
