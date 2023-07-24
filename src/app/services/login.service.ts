import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string =  'api/Auth/Login';

  constructor(private http: HttpClient) {} 

  userLogin(user : Login) : Observable<any>{
    return this.http.post<any>(this.myAppUrl + this.myApiUrl,user);
  }
}
