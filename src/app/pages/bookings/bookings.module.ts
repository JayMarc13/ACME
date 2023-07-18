import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { BookingsRoutingModule } from './bookings-routing.module';
import { BookingComponent } from './bookings.component';



@NgModule({
  declarations: [BookingComponent],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    SharedModule
  ],
  exports: [BookingComponent]
})
export class BookingsModule { }
