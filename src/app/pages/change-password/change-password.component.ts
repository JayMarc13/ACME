import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  onChangePassword() {
    // Aquí puedes agregar la lógica para cambiar la contraseña, por ejemplo, haciendo una solicitud HTTP a tu backend.
    // Asegúrate de validar las contraseñas antes de enviar la solicitud.
  }
}


