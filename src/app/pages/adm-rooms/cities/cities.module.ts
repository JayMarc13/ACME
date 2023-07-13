import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitiesRoutingModule } from './cities-routing.module';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    CitiesRoutingModule,
    SharedModule
  ],
  exports: [
    
  ]
})
export class CitiesModule { }
