import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from 'src/app/interfaces/booking';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingComponent {
  displayedColumns: string[] = ['ReserveId', 'MeetingRoomId', 'ReserveDate', 'StartTime', 'EndTime', 'Acciones'];
  dataSource = new MatTableDataSource<Booking>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Pop up y lista offices
  constructor(private _snackBar: MatSnackBar, private _bookingService: BookingService) { }

  ngOnInit(): void {
    this.obtenerBookings();
  }
  //Paginaciones y ordenar
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por página'
    }
  }

  //Filtro
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Obtener los bookings del usuario
  obtenerBookings() {
    this.loading = true;

  }


  //Funcion pop up de cancelar la reserva
 cancelarBooking(reserveId: number) {
    this.loading = true;

  }

  mensajeExito() {
    this._snackBar.open('La reserva ha sido cancelada', '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }
}
