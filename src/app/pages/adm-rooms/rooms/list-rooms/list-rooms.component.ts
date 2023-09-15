import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MeetingRoom } from '../../../../interfaces/meetingRoom';
import { MeetingRoomService } from '../../../../services/meeting-room.service';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.css']
})
export class ListRoomsComponent {
  displayedColumns: string[] = ['meetingRoomId', 'meetingRoomName', 'nameOffice', 'Acciones'];
  dataSource = new MatTableDataSource<MeetingRoom>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Pop up y lista offices
  constructor(private _snackBar: MatSnackBar, private _meetingRoomService: MeetingRoomService) { }

  ngOnInit(): void {
    this.obtenerRoom();
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

  obtenerRoom() {
    this.loading = true;
    this._meetingRoomService.getMeetingRooms().subscribe(data => {
      console.log(data);
      this.loading = false;
      this.dataSource.data = data;
    });
  }


  //Funcion pop up de eliminar
  eliminarRoom(meetingRoomId: number) {
    this.loading = true;

    this._meetingRoomService.deleteRoom(meetingRoomId).subscribe(() => {
      this.mensajeExito();
      this.loading = false;
      this.obtenerRoom();
    });
  }

  mensajeExito() {
    this._snackBar.open('La oficina fue eliminada con éxito', '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }
}