import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { MeetingRoom } from '../interfaces/meetingRoom';

@Injectable({
  providedIn: 'root'
})
export class MeetingRoomService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string =  'api/MeetingRoom/';

  constructor(private http: HttpClient) { }

  getMeetingRooms(): Observable <MeetingRoom[]>{
      return this.http.get<MeetingRoom[]>(this.myAppUrl+this.myApiUrl+"RoomsWithOffices");
  }
}
