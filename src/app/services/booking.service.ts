import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Country } from '../interfaces/country';
import { Booking } from '../interfaces/booking';


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Reserve';

  constructor(private http: HttpClient) { }

  getBookings(userId: string){
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/ReserveByUserId/${userId}`);
  }

  cancelBooking(reserveId:number){
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${reserveId}`);
  }

  createBooking(reserve:Booking){
    return this.http.post(this.myAppUrl + this.myApiUrl, reserve);
  }

  updateBooking(reserveId:number, reserve:Booking){
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${reserveId}`, reserve);
  }
}