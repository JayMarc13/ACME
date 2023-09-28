import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';
import { EditarUsuariosComponent } from '../../editar-usuarios/editar-usuarios.component';
import { MatDialog } from '@angular/material/dialog';
import { PopRemoveQuestionComponent } from '../../pop-remove-question/pop-remove-question.component';
import { RolsService } from 'src/app/services/rols.service';
import { ProfileService } from 'src/app/services/profile.service';
import { profile } from 'src/app/interfaces/profile';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {
  displayedColumns: string[] = ['userName', 'email','phone','RoleId','Acciones'];
  dataSource = new MatTableDataSource<users>();
  loading: boolean = false;

  userProfile? : profile
  userId !: string;
  isAdministrador: boolean = false;
  userRole! : string;



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

 constructor(private _snackBar: MatSnackBar,
  private _UsersService: UsersService,
  private dialog: MatDialog,
  private _rolService : RolsService,
  private _userProfile : ProfileService
  ) {

  }


  ngOnInit(): void {
    this.getuser();
    const userRole = sessionStorage.getItem('userRole');
    if(userRole != null){
      this.userRole = userRole;
      if(this.userRole == "Administrador"){

      }
    }

  }

  //Pop up
  openDialogEditar(idUsuario:string): void {
    const dialogRef = this.dialog.open(EditarUsuariosComponent, {data: {idUsuario}});
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

  getUserId(userName: string): Observable<string>{
    return this._userProfile.getUserProfile(userName).pipe(
      map(data => data.id)
    );

  }
  onToggleChange(event: any, userName: string) {
    const isAdministrador = event.checked;
    console.log("cambio "+isAdministrador); 
    this.getUserId(userName).subscribe(userId => {
      console.log("ID del usuario: " + userId);
      if(isAdministrador){
        this.addRoleToUser(userId,'Administrador');
      }else{
        this.addRoleToUser(userId,'User');
      }
    });
  }

  addRoleToUser( userId : string, rol : string){
    this._rolService.AddRoleToUser(userId, rol).subscribe(
      data => {
        console.log(data);
        // this.mensajeExito('añadido');
      }
    );
  }
  openDialog(identificationUser: string){
    let pathname = window.location.pathname;
    const dialogRef = this.dialog.open(PopRemoveQuestionComponent, {data: {identificationUser, pathname}});
  }

  mensajeExito() {
    this._snackBar.open('El usuario fue ${texto} con éxito', '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }


}
