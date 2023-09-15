import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environments';
import { users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Users/';


  constructor(private http: HttpClient) { }

  

    //Obtener la lista de Users
  getusers(): Observable<users[]> {
    return this.http.get<users[]>(this.myAppUrl + this.myApiUrl);
  }

  //Obtener el ususario dado el nombre
  getuser(userName: string): Observable<users> {
    return this.http.get<users>(this.myAppUrl + this.myApiUrl + userName);
  }


  //Eliminar el ususario (void porque no retornaremos nada)
  deleteuser(userName : string): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + userName);
  }

  //Añadir ususario en la base de datos
  adduser(User: users): Observable<any> {
    return this.http.post<any>(this.myAppUrl + this.myApiUrl, User);
  }

  //Editar datos del u suario 
  updateuser(userName: string, users: users): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + userName, users);
  }


}





