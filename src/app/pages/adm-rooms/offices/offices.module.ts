import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficesRoutingModule } from './offices-routing.module';
import { OfficesComponent } from './offices.component';


@NgModule({
  declarations: [
    OfficesComponent
  ],
  imports: [
    CommonModule,
    OfficesRoutingModule
  ],
  exports: [
    OfficesComponent
  ]
})
export class OfficesModule { }
