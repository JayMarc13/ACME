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
      //Obtener la officina dada la id
      getRoom(meetingRoomId: number): Observable<MeetingRoom> {
        return this.http.get<MeetingRoom>(this.myAppUrl + this.myApiUrl + meetingRoomId);
      }
    
      getRoomByOfficeId(officeId: number): Observable<MeetingRoom[]>{
        return this.http.get<MeetingRoom[]>(this.myAppUrl+this.myApiUrl+"office/"+ officeId);
      }
    
      //Eliminar la oficina (void porque no retornaremos nada)
      deleteRoom(meetingRoomId: number): Observable<void> {
        return this.http.delete<void>(this.myAppUrl + this.myApiUrl + meetingRoomId);
      }
    
      //Añadir oficinas en la base de datos
      addRoom(MeetingRoom: MeetingRoom): Observable<MeetingRoom> {
        return this.http.post<MeetingRoom>(this.myAppUrl + this.myApiUrl, MeetingRoom);
      }
    
      //Editar datos del pais 
      updateRoom(meetingRoomId: number, meetingRoom: MeetingRoom): Observable<void> {
        return this.http.put<void>(this.myAppUrl + this.myApiUrl + meetingRoomId, meetingRoom);
      }
}
