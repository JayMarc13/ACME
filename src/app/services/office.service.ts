import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { office } from '../interfaces/office';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Office/';

  constructor(private http: HttpClient) {
  }

  //Obtener la lista de Offices
  getOffices(): Observable<office[]> {
    return this.http.get<office[]>(this.myAppUrl + this.myApiUrl);
  }

  //Obtener la officina dada la id
  getOffice(Officeid: number): Observable<office> {
    return this.http.get<office>(this.myAppUrl + this.myApiUrl + Officeid);
  }


  //Eliminar la oficina (void porque no retornaremos nada)
  deleteOffice(Officeid: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + Officeid);
  }

  //Añadir oficinas en la base de datos
  addOffice(office: office): Observable<office> {
    return this.http.post<office>(this.myAppUrl + this.myApiUrl, office);
  }

  //Editar datos del pais 
  updateOffice(Officeid: number, office: office): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + Officeid, office);
  }


}
