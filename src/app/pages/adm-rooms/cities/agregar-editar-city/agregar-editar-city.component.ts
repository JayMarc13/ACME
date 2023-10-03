  import { Component, Inject } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { MatSnackBar } from '@angular/material/snack-bar';
  import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
  import { ActivatedRoute, Router } from '@angular/router';
  import { City } from '../../../../interfaces/city';
  import { CityService } from '../../../../services/city.service';
  import { CountryService } from '../../../../services/country.service';
  import { Country } from '../../../../interfaces/country';

  @Component({
    selector: 'app-agregar-editar-city',
    templateUrl: './agregar-editar-city.component.html',
    styleUrls: ['./agregar-editar-city.component.css']
  })
  export class AgregarEditarCityComponent {
    loading: boolean = false;
    form: FormGroup
    cityId: number;
    Operacion: string = 'Add';
    countries?: Country[]  ;



    constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      private dialogRef: MatDialogRef<AgregarEditarCityComponent>,
      private _cityService: CityService,
      private fb: FormBuilder,
      private _snackBar: MatSnackBar,
      private router: Router,
      private _countryService: CountryService,
      private aRoute: ActivatedRoute) {
      this.form = this.fb.group({
        cityName: ['', Validators.required], 
        countryId: ['', Validators.required],
        countryName:['', Validators.required]
      })

      this.cityId = data.identification;
    }


    ngOnInit(): void {
      if (this.cityId != 0) {
        this.Operacion = 'Editar';
        this.obtenerCity(this.cityId);
      }
      this._countryService.getCountries().subscribe(data => this.countries = data);
    }

    obtenerCity(cityId: number) {
      this.loading = true;
      this._cityService.getCity(this.cityId).subscribe(data => {
        this.form.patchValue({
          cityName: data.cityName,
        })
        this.loading = false;
      });
    }

    //Metodos
    agregarEditarCity() {
      //Definir el objeto
      const city: City = {
        cityName: this.form.value.cityName,
        countryId: this.form.value.countryId
      }

      if (this.cityId != 0) {
        city.cityId = this.cityId;
        this.editarcity(this.cityId, city);
      } else {
        this.agregarcity(city);
      }
    }

    editarcity(cityId: number, city: City) {
      this.loading = true;
      this._cityService.updateCity(cityId, city).subscribe(data => {
        this.loading = false;
        this.mensajeExito('actualizada');
        this.router.navigate(['/home/admRooms/cities/listaCity']);
      })
    }

    agregarcity(city: City) {
      //Enivar el objeto al backend
      this._cityService.addCity(city).subscribe(data => {
        this.mensajeExito('registrado');
        this.router.navigate(['/home/admRooms/cities/listaCity']);
      });
    }

    mensajeExito(texto: string) {
      this._snackBar.open(`La ciudad fue ${texto} con éxito`, '', {
        duration: 4000,
        horizontalPosition: 'right'
      });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

  }
