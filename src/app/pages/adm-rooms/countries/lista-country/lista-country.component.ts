import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Country } from '../../../../interfaces/country';
import { CountryService } from '../../../../services/country.service';

@Component({
  selector: 'app-lista-country',
  templateUrl: './lista-country.component.html',
  styleUrls: ['./lista-country.component.css']
})
export class ListaCountryComponent {
  displayedColumns: string[] = ['countryId', 'countryName', 'Acciones'];
  dataSource = new MatTableDataSource<Country>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Pop up y lista countries
  constructor(private _snackBar: MatSnackBar,
    private _countryService: CountryService) { }

  ngOnInit(): void {
    this.obtenerCountries();
  }

  //Paginaciones y ordenar
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por página'
    }
  }

  //Filtro Angular material
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  obtenerCountries() {
    this.loading = true;
    this._countryService.getCountries().subscribe(data => {
      this.loading = false;
      this.dataSource.data = data;
    });
  }

  //Funcion pop up de eliminar
  eliminarCountry(countryId: number) {
    this.loading = true;

    this._countryService.deleteCountry(countryId).subscribe(() => {
      this.mensajeExito();
      this.loading = false;
      this.obtenerCountries();
    });


  }

  mensajeExito() {
    this._snackBar.open('El pais fue eliminada con éxito', '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }
}
