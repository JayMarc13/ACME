import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.css']
})
export class AddEditUsersComponent {
  loading: boolean = false;
  form: FormGroup
  userName: string ;
  Operacion: string = 'Add';


 constructor(private _usersService: UsersService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      userName: ['', Validators.required], ////Campo requerido
    })

    this.userName = String(this.aRoute.snapshot.paramMap.get('userName'));
  }

  ngOnInit(): void {
    if (this.userName != ' ') {
      this.Operacion = 'Editar';
      this.obtainUser(this.userName);
    }
  }


  obtainUser(userName:string){
    this.loading = true;
    this._usersService.getuser(this.userName).subscribe(data => {
      this.form.setValue({
        useruseruserName: data.userName,
      })
      this.loading = false;
    });
  }



  //Metodos
  addedituser() {
    //Definir el objeto
    const users: users = {
      userName: this.form.value.userName,
      email: this.form.value.email,
    }

    if (this.userName != ' ') {
      users.userName = this.userName;
      this.edituser(this.userName, users);
    } else {
      this.adduser(users);
    }
  }

  edituser(userName: string, users: users) {
    this.loading = true;
    this._usersService.adduser(users).subscribe(data => {
      this.loading = false;
      this.mensajeExito('actualizada');
      this.router.navigate(['/home/admRooms/cities/listauser']);
    })
  }

  adduser(users: users) {
    //Enivar el objeto al backend
    this._usersService.adduser(users).subscribe(data => {
      this.mensajeExito('registrado');
      this.router.navigate(['/home/admRooms/users/list-users/listusers']);
    });
  }

  mensajeExito(texto: string) {
    this._snackBar.open(`El usuario fue ${texto} con éxito`, '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }
}
