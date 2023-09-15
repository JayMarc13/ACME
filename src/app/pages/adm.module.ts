import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoutingModule } from './adm-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
<<<<<<< HEAD
=======

>>>>>>> 3936356ba4d4414a126e5a2bd92b9b93da4b15bc



@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent

  ],
  imports: [
    CommonModule,
    AdmRoutingModule,
    SharedModule

  ]
})
export class AdmModule { }
