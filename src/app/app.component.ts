import { Component } from '@angular/core';
import { ConnectionStatusService } from './services/connection-status.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ACMEFrontendVersion3';
  isOnline!: boolean;
  constructor(
              private _connectionService: ConnectionStatusService,
              private _snackBar: MatSnackBar){}
  ngOnInit(){
    this._connectionService.isOnline().subscribe((online) => {
      this.isOnline = online;
      if(!this.isOnline){
        this.mensajeErrorExito("No tiene conexión");
      }
    });
  }
  mensajeErrorExito(texto: string) {
    this._snackBar.open(`${texto}`, '', {
      duration: 8000,
      verticalPosition: 'bottom'
    });
  }
}
