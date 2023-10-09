//Este archivo sirve para hacer conexión con la parte backend

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private myAppUrl: string = environment.endpoint.geolocalizaciones;
  private myApiUrl: string =  'api/Country/';

  constructor(private http: HttpClient) {

  }

  //Obtener la lista de countries
  getCountries() : Observable<Country[]>{
    return this.http.get<Country[]>(this.myAppUrl + this.myApiUrl);
  }

  //Obtener el country dada la id
  getCountry(countryId : number) : Observable<Country>{
    return this.http.get<Country>(this.myAppUrl + this.myApiUrl+countryId);
  }

  //Eliminar el pais (void porque no retornaremos nada)
  deleteCountry(countryId : number) : Observable<void>{
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl+countryId);
  }

  //Añadir pais en la base de datos
  addCountry(country: Country) : Observable<Country>{
    return this.http.post<Country>(this.myAppUrl + this.myApiUrl, country);
  }

  //Editar datos del pais
  updateCountry(countryId:number, country: Country): Observable<void>{
    return this.http.put<void>(this.myAppUrl + this.myApiUrl+countryId, country);
  }
}
