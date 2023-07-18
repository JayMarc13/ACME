import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Register } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string =  'api/Auth/Register';

  constructor(private http: HttpClient) {} 

  userRegister(user : Register) : Observable<any>{
    return this.http.post<any>(this.myAppUrl + this.myApiUrl,user);
  }
}
