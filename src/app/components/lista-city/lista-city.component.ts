import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CityService } from '../../services/city.service';
import { City } from 'src/app/interfaces/city';

@Component({
  selector: 'app-lista-city',
  templateUrl: './lista-city.component.html',
  styleUrls: ['./lista-city.component.css']
})
export class ListaCityComponent {
  displayedColumns: string[] = ['cityId', 'cityName', 'countryId', 'Acciones'];
  dataSource = new MatTableDataSource<City>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Pop up y lista offices
  constructor(private _snackBar: MatSnackBar, private _cityService: CityService) { }

  ngOnInit(): void {
    this.obtenerCity();
  }
  //Paginaciones y ordenar
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por página'
    }
  }

  //Filtro
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obtenerCity() {
    this.loading = true;
    this._cityService.getCitys().subscribe(data => {
      console.log(data);
      this.loading = false;
      this.dataSource.data = data;
    });
  }


  //Funcion pop up de eliminar
  eliminarCity(cityId: number) {
    this.loading = true;

    this._cityService.deleteCity(cityId).subscribe(() => {
      this.mensajeExito();
      this.loading = false;
      this.obtenerCity();
    });
  }

  mensajeExito() {
    this._snackBar.open('La oficina fue eliminada con éxito', '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }

}


