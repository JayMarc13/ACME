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
      confirmPassword: ['', Validators.required]
    });
  }


  onChangePassword() {
    
    const newPassword = this.form.value.password;
    if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/\d/.test(newPassword)) {
      // La contraseña no cumple con los requisitos
      // Muestra un mensaje de error al usuario
      this.snackBar.open('La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula y un número.', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      return false;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.error("New Password and Confirm Password do not match");
      this.form.reset();
      return;
    }else{
    

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


