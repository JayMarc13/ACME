import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { office } from 'src/app/interfaces/office';
import { OfficeService } from '../../services/office.service';

@Component({
  selector: 'app-lista-office',
  templateUrl: './lista-office.component.html',
  styleUrls: ['./lista-office.component.css']
})
export class ListaOfficeComponent {
  displayedColumns: string[] = ['ID', 'Nombre', 'Ciudad'];
  dataSource = new MatTableDataSource<office>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
   
    //Pop up y lista offices
  constructor(private _snackBar: MatSnackBar, private _officeService: OfficeService) { }

  ngOnInit(): void {
    this.obtenerOffices();
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

  obtenerOffices() {
    this.loading = true;
    this._officeService.getOffices().subscribe(data => {
      this.loading = false;
      this.dataSource.data = data;
    });
  }


  //Funcion pop up de eliminar
  eliminarOffice(Officeid: number) {
    this.loading = true;

    this._officeService.deleteOffice(Officeid).subscribe(() => {
      this.mensajeExito();
      this.loading = false;
      this.obtenerOffices();
    });
  }

  mensajeExito(texto: string) {
    this._snackBar.open('La oficina fue eliminada con éxito', '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }
}


