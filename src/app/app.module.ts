import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Modulos Angular Materials
import { SharedModule } from './shared/shared.module';

//Componentes
import { AgregarEditarCountryComponent } from './components/agregar-editar-country/agregar-editar-country.component';
import { ListaCountryComponent } from './components/lista-country/lista-country.component';
import { VerCountryComponent } from './components/ver-country/ver-country.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AgregarEditarCountryComponent,
    ListaCountryComponent,
    VerCountryComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
