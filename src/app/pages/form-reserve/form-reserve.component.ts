import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MeetingRoomService } from 'src/app/services/meeting-room.service';

@Component({
  selector: 'app-form-reserve',
  templateUrl: './form-reserve.component.html',
  styleUrls: ['./form-reserve.component.css']
})
export class FormReserveComponent {
  date = new Date();


  constructor(private _meetingRoomService: MeetingRoomService){}
}
