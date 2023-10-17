import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingService } from 'src/app/services/booking.service';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from 'src/app/interfaces/booking';
import { EditReservasComponent } from '../edit-reservas/edit-reservas.component';
import { MatDialog } from '@angular/material/dialog';
import { PopRemoveQuestionComponent } from '../../pop-remove-question/pop-remove-question.component';
import { FormReserveComponent } from '../../form-reserve/form-reserve.component';

@Component({
  selector: 'app-list-reservas',
  templateUrl: './list-reservas.component.html',
  styleUrls: ['./list-reservas.component.css']
})
export class ListReservasComponent {
  displayedColumns: string[] = ['userName',
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
    private _bookingService: BookingService,
    private dialog: MatDialog) {

  }
  ngOnInit(): void {

      this.obtenerAllBookings();
  }

  openDialogEditar(element: any): void {
    const dialogRef = this.dialog.open(EditReservasComponent, {
      data: element
    });
  }

  openDialogAgregrarReserva(): void {
    let pathname = window.location.pathname;
    const dialogRef = this.dialog.open(FormReserveComponent, {data: {pathname}});
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
      this.loading = false;
      this.dataSource.data = data;
    });
  }

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

  openDialog(identification: number){
    let pathname = window.location.pathname;
    const dialogRef = this.dialog.open(PopRemoveQuestionComponent, {data: {identification, pathname}});
  }

  mensajeExito() {
    this._snackBar.open('La reserva ha sido cancelada', '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  } 
}
