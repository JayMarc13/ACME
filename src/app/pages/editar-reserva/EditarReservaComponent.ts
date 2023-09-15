import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/interfaces/booking';
import { MeetingRoom } from 'src/app/interfaces/meetingRoom';
import { BookingService } from 'src/app/services/booking.service';
import { MeetingRoomService } from 'src/app/services/meeting-room.service';


@Component({
  selector: 'app-editar-reserva',
  templateUrl: './editar-reserva.component.html',
  styleUrls: ['./editar-reserva.component.css']
})
export class EditarReservaComponent {
  displayedColumns: string[] = ['reserveDate', 'startTime', 'endTime', 'Acciones'];
  dataSource = new MatTableDataSource<Booking>();
  loading: boolean = false;
  reservaId!: number;
  form!:FormGroup;

  meetingRoomId!:number;
  userId!: string;
  meetingRoomName!: string;



  reserva: Booking = {
    reserveId: 0,
    meetingRoomName: '',
    reserveDate: '',
    startTime: '',
    endTime: '' // Debe tener un valor inicial
    // Otros campos que no se pueden editar
    ,
    meetingRoomId: 0,
    userId: ''
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Pop up y lista offices
  constructor(private _snackBar: MatSnackBar,
    private _bookingService: BookingService,
    private router: Router,
    private fb: FormBuilder,
    private _meetingRoomService: MeetingRoomService,
    private aRoute: ActivatedRoute) {
      this.form = this.fb.group({
        reserveDate: ['',Validators.required], // Asociar los valores de reserva a los campos del formulario
        startTime: ['',Validators.required], // Asociar los valores de reserva a los campos del formulario
        endTime: ['',Validators.required] // Asociar los valores de reserva a los campos del formulario
      });
      this.reservaId=  Number(this.aRoute.snapshot.paramMap.get('reserveId'));
     }

  ngOnInit(): void{
      this.obtenerBookingsById(this.reservaId)
  }

  obtenerBookingsById(reservaId: number ) {
    this.loading = true;
    this._bookingService.getBookingsById(reservaId).subscribe((data: Object) => {
      // console.log("editar reservaa "+ JSON.stringify(data) );
      const reserva : Booking = data as Booking;
      this.meetingRoomId= reserva.meetingRoomId;
      this.userId=reserva.userId;

      this.obtenerMeetingRoomName(this.meetingRoomId);


      this.form.setValue({
        reserveDate: reserva.reserveDate,
        startTime: reserva.startTime,
        endTime: reserva.endTime

      })

      this.loading = false;
    });
  }

  obtenerMeetingRoomName(meetingRoomId: number){
    this._meetingRoomService.getRoom(meetingRoomId).subscribe((data:Object) =>{
      const meetingRoom : MeetingRoom = data as MeetingRoom;
      this.meetingRoomName = meetingRoom.meetingRoomName;
      console.log("holsdfr "+ meetingRoom.meetingRoomName);
    })
  }
  editarReserva(reservaId:number, reserva: Booking) {
    this.loading = true;
    this._bookingService.updateBooking(reservaId, reserva).subscribe(data => {
      this.loading = false;
      // this.router.navigate(['/home/bookings']);
    })
  }

  modificarReserva(){
    if(this.reservaId !=0){
      // Fecha en formato de cadena
      const fechaString = this.form.value.reserveDate;

      // Crear un objeto de fecha a partir de la cadena
      const fecha = new Date(fechaString);

      // Obtener los componentes de fecha (año, mes, día)
      const year = fecha.getFullYear();
      const month = String(fecha.getMonth() + 1).padStart(2, "0"); // Sumamos 1 al mes porque en JavaScript los meses van de 0 a 11
      const day = String(fecha.getDate()).padStart(2, "0");

      // Construir la fecha en formato YYYY-MM-DD
      const fechaFormateada = `${year}-${month}-${day}`;

      console.log("nuevafecha"+fechaFormateada); // Salida: "2023-09-15"

      this.reserva ={
        reserveDate: fechaFormateada,
        startTime: this.form.value.startTime,
        endTime: this.form.value.endTime,

        userId: this.userId,
        reserveId: this.reservaId,
        meetingRoomId: this.meetingRoomId
      }
      this.editarReserva(this.reservaId, this.reserva);

      setTimeout(function(){
        window.location.reload();
     }, 10);
    //  this.mensajeExito("actualizada");
    }

  }


  mensajeExito(texto: string) {
    this._snackBar.open(`La reserva fue ${texto} con éxito`, '', {
      duration: 2000,
      horizontalPosition: 'right'
    });
  }

}
