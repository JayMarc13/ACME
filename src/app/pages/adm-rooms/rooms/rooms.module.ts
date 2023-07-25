import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { VerRoomsComponent } from './ver-rooms/ver-rooms.component';
import { ListRoomsComponent } from './list-rooms/list-rooms.component';
import { AgregarEditarRoomsComponent } from './agregar-editar-rooms/agregar-editar-rooms.component';


@NgModule({
  declarations: [
    ListRoomsComponent,
    VerRoomsComponent,
    AgregarEditarRoomsComponent,
    VerRoomsComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    SharedModule
  ],
  exports: [
    
  ]
})
export class RoomsModule { }
