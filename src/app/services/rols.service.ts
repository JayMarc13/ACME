import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class RolsService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string =  'api/Auth/AddRol/';
  private myApiUrlV: string =  'api/Auth/verificationAdm';


  constructor(private http: HttpClient) {}

  AddRoleToUser(userId: string, rol: string): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}?userId=${userId}&rol=${rol}`;
    return this.http.post<any>(url, {});
  }

  AdministratorVerification(userId: string): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrlV}?userId=${userId}`;
    return this.http.get<any>(url, {});
  }
}
