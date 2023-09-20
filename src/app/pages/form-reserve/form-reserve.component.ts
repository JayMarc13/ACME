import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MeetingRoomService } from 'src/app/services/meeting-room.service';
import * as dayjs from 'dayjs';
import { Country } from 'src/app/interfaces/country';
import { City } from 'src/app/interfaces/city';
import { Office } from 'src/app/interfaces/office';
import { CountryService } from 'src/app/services/country.service';
import { CityService } from 'src/app/services/city.service';
import { OfficeService } from 'src/app/services/office.service';
import { MeetingRoom } from 'src/app/interfaces/meetingRoom';
import { Booking } from 'src/app/interfaces/booking';
import { ProfileService } from 'src/app/services/profile.service';
import { BookingService } from 'src/app/services/booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { users } from 'src/app/interfaces/users';
import { profile } from 'src/app/interfaces/profile';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form-reserve',
  templateUrl: './form-reserve.component.html',
  styleUrls: ['./form-reserve.component.css']
})
export class FormReserveComponent {
  user?: string;
  bookingUser : Booking = {} as Booking;
  countries : Country[] = [];
  countrySelected: Country = {} as Country;
  cities  : City[] = [];
  citySelected: City = {} as City;
  offices : Office[] = [];
  officeSelected : Office = {} as Office;
  meetingRooms : MeetingRoom[] = [];
  meetingRoomSelected : MeetingRoom = {} as MeetingRoom;

  listUsers!: string[];
  userSelected!: string;
  userRole: string | any;
  mostrarElemento: boolean = false;

  // userRecuperado: profile = {
  //   id: '',
  //   userName: '',
  //   normalizedUserName: '',
  //   email: '',
  //   normalizedEmail: '',
  //   emailConfirmed: false,
  //   passwordHash: '',
  //   securityStamp: '',
  //   concurrencyStamp: '',
  //   phoneNumber: '',
  //   phoneNumberConfirmed: false,
  //   twoFactorEnabled: false,
  //   lockoutEnd: '',
  //   lockoutEnabled: false,
  //   accessFailedCount: 0
  // };

  reserveId: number | any;

  date = new Date();
  form: FormGroup

  //Form Control
  countryFormControl = new FormControl();
  cityFormControl = new FormControl();
  officeFormControl = new FormControl();
  meetingRoomFormControl = new FormControl();
  userFormControl = new FormControl();

  loading: boolean = false;

  constructor(private _bookingService: BookingService,
    private _userService: ProfileService,
    private _meetingRoomService: MeetingRoomService,
    private _countryService: CountryService,
    private _cityService : CityService,
    private _officeService: OfficeService,
    private fb: FormBuilder){
    this.form = this.fb.group({
      meetingRoom : ['', Validators.required],
      date : ['',Validators.required],
      endHour : ['', Validators.required],
      startHour : ['', Validators.required]
    });

    this.countryFormControl.valueChanges.subscribe(selectedCountry => {
      this.countrySelected = selectedCountry;
      const countryId = this.countrySelected.countryId;
      if(countryId){
        this.ObtenerCities(countryId);
      }
    });

    this.cityFormControl.valueChanges.subscribe(selectedCity => {
      this.citySelected = selectedCity;
      const cityId = this.citySelected.cityId;
      if(cityId){
        this.ObtenerOffices(cityId);
      } });

      this.officeFormControl.valueChanges.subscribe(selectedOffice => {
        this.officeSelected = selectedOffice;
        const officeId = this.officeSelected.officeId;
        if(officeId){
          this.ObtenerMeetingRooms(officeId);
        }
      });

      this.meetingRoomFormControl.valueChanges.subscribe(selectedMeetingRoom =>{
        this.meetingRoomSelected = selectedMeetingRoom;
      });

      this.userFormControl.valueChanges.subscribe(selectedUser => {
        this.userSelected = selectedUser;
        if(this.userSelected != null){
          this.ObtenerUsuario(this.userSelected);
        }
      });
  }

  ngOnInit(){
    this.ObtenerCountries();
    const userName = sessionStorage.getItem('user');
    this.userRole = sessionStorage.getItem('userRole');
    console.log(this.userRole);
    if(userName){
      this.ObtenerUsuario(userName);
    }
    if(this.userRole == 'Administrador'){
      this.mostrarElemento= true;
      this.ObtenerAllUsers();
    }

  //    // Check if 'reserveId' has a value (assuming you set it when editing the reservation)
   }

  reservarSala(){
    const date = dayjs(this.form.value.date).format('YYYY-MM-DD');

    this.bookingUser.meetingRoomId = this.meetingRoomSelected.meetingRoomId;
    this.bookingUser.reserveDate = date;
    this.bookingUser.startTime = this.form.value.startHour;
    this.bookingUser.endTime = this.form.value.endHour;
    if(this.user){
      this.bookingUser.userId = this.user;
    }

    this.hacerReserva(this.bookingUser);
  }

  ObtenerCountries(){
    this._countryService.getCountries().subscribe( dataCountries => {
      this.countries = dataCountries;
    })
  }

  ObtenerCities(idCountry:number){
      this._cityService.getCitiesByCountryId(idCountry).subscribe(dataCities =>{
        this.cities = dataCities;
    });
  }

  ObtenerOffices(cityId: number){
    this._officeService.getOfficesByCityId(cityId).subscribe(dataOffices => {
      this.offices = dataOffices;
    });
  }

  ObtenerMeetingRooms(officeId: number){
    this._meetingRoomService.getRoomByOfficeId(officeId).subscribe(dataRooms => {
      this.meetingRooms = dataRooms;
    });
  }

  ObtenerUsuario(userName: string){
    this._userService.getUserProfile(userName).subscribe(dataUser => {
      this.user = dataUser.id;
      // console.log(this.user);
    });
  }

  hacerReserva(reserva: Booking){
    this._bookingService.createBooking(reserva).subscribe(succes =>  {
      if(this.userRole=='Administrador'){
        window.location.href = "/home/admReservas/listReservas"
      }else{
        window.location.href = "/home/bookings"
      }

    });
  }

  ObtenerAllUsers() {
    this._userService.getAllUsers().subscribe(
      (data: profile[]) => {
        const listUsers = data;// Asigna la respuesta (array) a this.listUsers
        this.listUsers = listUsers.map( valor => valor.userName);
        console.log(this.listUsers);
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

}



