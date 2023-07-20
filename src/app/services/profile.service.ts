import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { profile } from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Users/'; // Ajusta esto según tu API

  constructor(private http: HttpClient) {}

  getUserProfile(user: string): Observable<profile> {
    // Aquí realizar la solicitud HTTP para obtener los detalles del perfil del usuario.
    // Asumiendo que la respuesta contiene un objeto con campos "user" y "email".
    return this.http.get<profile>(this.myAppUrl + this.myApiUrl+user);
  }
}

