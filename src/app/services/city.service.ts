import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environments';
import { City } from '../interfaces/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Office/';

  constructor(private http: HttpClient) {
  }

  //Obtener la lista de Offices
  getCitys(): Observable<City[]> {
    return this.http.get<City[]>(this.myAppUrl + this.myApiUrl);
  }

  //Obtener la officina dada la id
  getCity(Cityid: number): Observable<City> {
    return this.http.get<City>(this.myAppUrl + this.myApiUrl + Cityid);
  }


  //Eliminar la oficina (void porque no retornaremos nada)
  deleteCity(Cityid: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + Cityid);
  }

  //Añadir oficinas en la base de datos
  addCity(City: City): Observable<City> {
    return this.http.post<City>(this.myAppUrl + this.myApiUrl, City);
  }

  //Editar datos del pais 
  updateCity(Cityid: number, City: City): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + Cityid, City);
  }


}
