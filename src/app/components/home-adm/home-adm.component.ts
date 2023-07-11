import { Component, LOCALE_ID } from '@angular/core';
import { tokenUser } from 'src/app/interfaces/token';

@Component({
  selector: 'app-home-adm',
  templateUrl: './home-adm.component.html',
  styleUrls: ['./home-adm.component.css']
})
export class HomeAdmComponent {
  token?: tokenUser; // Variable para almacenar el token

  ngOnInit(): void {
    const token =   localStorage.getItem('token') ;// Obtener el token del localStorage
   console.log(token);
    
    // Guardar el token en el localStorage
    // if (!this.token) {
    //   const newToken = '...'; // Aquí debes proporcionar el valor del token que deseas guardar
    //   localStorage.setItem('token', newToken);
    //   this.token = newToken;
    // }
}
}
