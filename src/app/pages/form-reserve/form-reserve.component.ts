import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MeetingRoomService } from 'src/app/services/meeting-room.service';
import * as dayjs from 'dayjs';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from 'src/app/interfaces/booking';
import { Country } from 'src/app/interfaces/country';
import { MeetingRoom } from 'src/app/interfaces/meetingRoom';
import { City } from 'src/app/interfaces/city';
import { Office } from 'src/app/interfaces/office';
import { CountryService } from 'src/app/services/country.service';
import { CityService } from 'src/app/services/city.service';


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
  countries : Country[] = [];
  countrySelected: Country = {} as Country;
  cities  : City[] = [];
  citySelected: City = {} as City;
  offices : Office[] = [];
  officeSelected : Office = {} as Office;

  date = new Date();
  form: FormGroup

  //Form Control
  countryFormControl = new FormControl();
  cityFormControl = new FormControl();
  officeFormControl = new FormControl();
  meetingRoomFormControl = new FormControl();

  constructor(private _meetingRoomService: MeetingRoomService, private _countryService: CountryService, private _cityService : CityService,private fb: FormBuilder){
    this.form = this.fb.group({
      meetingRoom : ['', Validators.required],
      date : ['',Validators.required],
      endHour : ['', Validators.required],
      startHour : ['', Validators.required]
    })

    this.countryFormControl.valueChanges.subscribe(selectedCountry => {
      this.countrySelected = selectedCountry;
      const countryId = this.countrySelected.countryId;
      if(countryId){
        this.ObtenerCities(countryId);
      }
    });

    this.cityFormControl.valueChanges.subscribe(selectedCity => {
      this.citySelected = selectedCity;
      
    });
  }

  ngOnInit(){
    this.ObtenerCountries();
  }

  reservarSala(){
    const date = dayjs(this.form.value.date).add(7, 'days').format('YYYY/MM/DD');
    const userName = sessionStorage.getItem('user');
    console.log(this.cities);
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
}
