import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Country } from '../interfaces/country';


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Reserves';

  constructor(private http: HttpClient) { }

  getBookings(userId: number){
    return this.http.get(this.myAppUrl+this.myApiUrl+userId);
  }

  cancelBooking(reserveId:number){
    return this.http.delete(this.myAppUrl+this.myApiUrl+reserveId);
  }
}
