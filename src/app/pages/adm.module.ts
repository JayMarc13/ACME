import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoutingModule } from './adm-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { PopRemoveQuestionComponent } from './pop-remove-question/pop-remove-question.component';



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
