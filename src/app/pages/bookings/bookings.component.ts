import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { map } from 'rxjs';
import { Booking } from 'src/app/interfaces/booking';
import { BookingService } from 'src/app/services/booking.service';


@Component({
  selector: 'app-booking',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})export class BookingComponent {
  displayedColumns: string[] = ['reserveId', 'meetingRoomName', 'reserveDate', 'startTime', 'endTime', 'Acciones'];
  dataSource = new MatTableDataSource<Booking>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Pop up y lista offices
  constructor(private _snackBar: MatSnackBar, private _bookingService: BookingService) {

  }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
    if(userId){
      this.obtenerBookings(userId);
    }
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
  // obtenerBookings(userId: string) {
  //   this.loading = true;
  //   this._bookingService.getBookings(userId).subscribe((data: Object) => {
  //     console.log(data);
  //     this.loading = false;
  //     this.dataSource.data = data as Booking[];

  //   });
  // }

  obtenerBookings(userId: string) {
    this.loading = true;
    this._bookingService.getBookings(userId).pipe(
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
  //Funcion pop up de cancelar la reserva
 cancelarBooking(reserveId: number) {
    this.loading = true;
    this._bookingService.cancelBooking(reserveId).subscribe(() => {
      this.mensajeExito();
      this.loading = false;
      const userId = sessionStorage.getItem('userId');
      if(userId){
        this.obtenerBookings(userId);
      }
    });

  }




  mensajeExito() {
    this._snackBar.open('La reserva ha sido cancelada', '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }
}
