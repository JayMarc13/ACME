import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//rutas
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Modulos Angular Materials
import { SharedModule } from './shared/shared.module';

//Componentes
import { AgregarEditarCountryComponent } from './components/agregar-editar-country/agregar-editar-country.component';
import { ListaCountryComponent } from './components/lista-country/lista-country.component';
import { VerCountryComponent } from './components/ver-country/ver-country.component';
import { AgregarEditarOfficeComponent } from './components/agregar-editar-office/agregar-editar-office.component';
import { ListaOfficeComponent } from './components/lista-office/lista-office.component';
import { VerOfficeComponent } from './components/ver-office/ver-office.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { HomeAdmComponent } from './components/home-adm/home-adm.component';
import { UsersComponent } from './components/users/users.component';
import { RoomsComponent } from './components/rooms/rooms.component';




@NgModule({
  declarations: [
    AppComponent,
    AgregarEditarCountryComponent,
    AgregarEditarOfficeComponent,
    ListaCountryComponent,
    ListaOfficeComponent,
    VerCountryComponent,
    VerOfficeComponent,
    LoginComponent,
    HomeComponent,
    BookingsComponent,
    HomeAdmComponent,
    UsersComponent,
    RoomsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ToastrModule.forRoot(),
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }