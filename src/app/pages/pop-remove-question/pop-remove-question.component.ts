import { Component ,  Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingService } from 'src/app/services/booking.service';
import { CityService } from 'src/app/services/city.service';
import { CountryService } from 'src/app/services/country.service';
import { MeetingRoomService } from 'src/app/services/meeting-room.service';
import { OfficeService } from 'src/app/services/office.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-pop-remove-question',
  templateUrl: './pop-remove-question.component.html',
  styleUrls: ['./pop-remove-question.component.css']
})
export class PopRemoveQuestionComponent {
  identification: number;
  pathName: string;
  booking?: boolean;
  countries?: boolean; 
  cities?: boolean; 
  offices?: boolean;
  rooms?: boolean;
  user?: boolean;
  reservation?: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<PopRemoveQuestionComponent>
    ,private _bookingService: BookingService
    ,private _countryService: CountryService
    ,private _cityService: CityService
    ,private _officeService: OfficeService
    ,private _roomService: MeetingRoomService
    ,private _userService: UsersService){
      this.identification = data.identification;
      this.pathName = data.pathname;
    }
  
  ngOnInit(){
    switch(this.pathName){
      case "/home/bookings":
        this.booking = true;
        break;
      case "/home/admRooms/countries/listaCountries":
        this.countries = true;
        break;
      case "/home/admRooms/cities/listaCity":
        this.cities = true;
        break;
      case "/home/admRooms/offices/listaOffices":
        this.offices = true;
        break;
      case "/home/admRooms/rooms/listaRoom":
        this.rooms = true;
        break;
      case "/home/users/listUser":
        this.user = true;
        break;
      case "/home/admReservas/listReservas":
        this.reservation = true;
        break;
    }  
  }


  //Funcion pop up de cancelar la reserva
 removeElement() {
  switch(this.pathName){
    case "/home/bookings":
      this._bookingService.cancelBooking(this.identification).subscribe(() => {
        this.mensajeExito();
        this.refreshWindow();
      });
      break;
    case "/home/admRooms/countries/listaCountries":
        this._countryService.deleteCountry(this.identification).subscribe(() => {
          this.mensajeExito();
          this.refreshWindow();
        });
      break;
    case "/home/admRooms/cities/listaCity":
        this._cityService.deleteCity(this.identification).subscribe(() => {
          this.mensajeExito();
          this.refreshWindow();
        });
      break;
  }  
}


onNoClick(): void {
  this.dialogRef.close();
}

mensajeExito() {
  switch(this.pathName){
    case "/home/bookings":
      this.popup("Your reserve is already canceled");
      break;
    case "/home/admRooms/countries/listaCountries":
      this.popup("Your removed the country in the database");
      break;
    case "/home/admRooms/cities/listaCity":
      this.popup("Your removed the city in the database");
      break;
  }  
 
}


popup(mensaje: string){
  this._snackBar.open(mensaje,'', {
    duration: 4000,
    horizontalPosition: 'right'
  });
}

refreshWindow(){
  this.onNoClick();
        setTimeout(function(){
          window.location.reload();
        }, 2000);
}
}
