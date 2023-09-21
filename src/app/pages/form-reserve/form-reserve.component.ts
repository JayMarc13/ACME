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
  horas: string[] = ["10:00", "10:15" , "10:30", "10:45", "11:00", "11:15", "11:45", 
  "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45",
   "15:00","15:15","15:30","15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", 
   "18:00","18:15","18:30","18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00","21:15","21:30","21:45", "22:00"];

  reserveId: number | any;

  date = new Date();
  form: FormGroup

  //Form Control
  countryFormControl = new FormControl();
  cityFormControl = new FormControl();
  officeFormControl = new FormControl();
  meetingRoomFormControl = new FormControl();

  loading: boolean = false;

  constructor(private _bookingService: BookingService,
    private _userService: ProfileService,
    private _meetingRoomService: MeetingRoomService,
    private _countryService: CountryService,
    private _cityService : CityService,
    private _officeService: OfficeService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router){
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
  }

  ngOnInit(){
    this.ObtenerCountries();
    const userName = sessionStorage.getItem('user');
    if(userName){
      this.ObtenerUsuario(userName);
    }
    this.endHourSelected();
   }

   endHourSelected(){
      console.log("this.form.value.endHour");
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
      window.location.href = "/home/bookings"
    });
  }

  }




