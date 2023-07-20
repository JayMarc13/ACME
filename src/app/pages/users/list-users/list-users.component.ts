import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {
  displayedColumns: string[] = ['userName', 'email'];
  dataSource = new MatTableDataSource<users>();
  loading: boolean = false;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

 constructor(private _snackBar: MatSnackBar, private _UsersService: UsersService) { }

  ngOnInit(): void {
    this.getuser();
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

  getuser() {
    this.loading = true;
    this._UsersService.getusers().subscribe(data => {
      console.log(data);
      this.loading = false;
      this.dataSource.data = data;
    });
  }

    //Funcion pop up de eliminar
  deleteuser(userName: string) {
    this.loading = true;

    this._UsersService.deleteuser(userName).subscribe(() => {
      this.mensajeExito();
      this.loading = false;
      this.getuser();
    });
  }

  mensajeExito() {
    this._snackBar.open('El usuario fue eliminado con éxito', '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }

  
}
