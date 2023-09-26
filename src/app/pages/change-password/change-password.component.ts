import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ChangePassword } from 'src/app/interfaces/changePassword';
import { login } from 'src/app/interfaces/login';
import { changePasswordUser } from 'src/app/interfaces/changePasswordUser';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  form: FormGroup
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  loginUser?: login;
  NewPasswordUser?: ChangePassword;


  constructor(
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: LoginService, // Inyecta el servicio de autenticación
    private router: Router ,// Inyecta el servicio de enrutamiento
    private _changePasswordService: LoginService
  ) {
    this.form = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatNewPassword: ['', Validators.required]
    });
  }
    

  onChangePassword() {
    // Aquí puedes agregar la lógica para cambiar la contraseña, por ejemplo, haciendo una solicitud HTTP a tu backend.
    // Asegúrate de validar las contraseñas antes de enviar la solicitud.

    if (this.newPassword !== this.confirmPassword) {
      this.error("New Password and Confirm Password do not match");
      this.form.reset();
      return;
    }else{
    
    let userName = sessionStorage.getItem("user");
     if(userName){
      this.loginUser = {
        userName: userName,
        email: "",
        password: this.form.value.oldPassword
      }
     }
     this.NewPasswordUser = {
      contraseñaActual: this.form.value.oldPassword,
      nuevaContraseña: this.form.value.newPassword,
      confirmarNuevaContraseña: this.form.value.repeatNewPassword
     }

     if(this.loginUser && this.NewPasswordUser){
      let updatePassword: changePasswordUser = {
        user: this.loginUser,
        changePassword: this.NewPasswordUser
       }
       this._changePasswordService.changePassword(updatePassword).subscribe(data => {
        window.location.href = " ";
       }, error => {
        console.log("Algo esta mal");
       });;
     }
    }

  }

  error(message: string): void {
    this.snackBar.open(message, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}


