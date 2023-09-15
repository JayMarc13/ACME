import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingService } from 'src/app/services/booking.service';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from 'src/app/interfaces/booking';

@Component({
  selector: 'app-list-reservas',
  templateUrl: './list-reservas.component.html',
  styleUrls: ['./list-reservas.component.css']
})
export class ListReservasComponent {
  displayedColumns: string[] = ['UserName',
  'reserveId',
  'meetingRoomName',
  'reserveDate',
  'startTime',
   'endTime',
   'Acciones'];

   loading: boolean = false;
   dataSource = new MatTableDataSource<Booking>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar,
    private _bookingService: BookingService) {

  }
  ngOnInit(): void {

      this.obtenerAllBookings();
  }
  obtenerAllBookings() {
    this.loading = true;
    this._bookingService.getAllBookings().pipe(
      map((data: any) => {
        // Mapear los datos para modificar el formato de la fecha
        const reservas = data.map((reserva: any) => {
          reserva.reserveDate = reserva.reserveDate.split('T')[0]; // Eliminar la parte "T00:00:00"
          return reserva;
        });
        return reservas;
      })
    ).subscribe((data: Booking[]) => {
      console.log(data);
      this.loading = false;
      this.dataSource.data = data;
    });
  }
}
