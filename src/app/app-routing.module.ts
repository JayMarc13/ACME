import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { ListaCountryComponent } from './components/lista-country/lista-country.component';
import { AgregarEditarCountryComponent } from './components/agregar-editar-country/agregar-editar-country.component';
import { VerCountryComponent } from './components/ver-country/ver-country.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { HomeAdmComponent } from './components/home-adm/home-adm.component';
import { UsersComponent } from './components/users/users.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ToastrModule } from 'ngx-toastr';
import { DashboardRoutingModule } from './components/dashboard/dashboard-routing.module';
import { ListaOfficeComponent } from './components/lista-office/lista-office.component';
import { AgregarEditarOfficeComponent } from './components/agregar-editar-office/agregar-editar-office.component';
import { VerOfficeComponent } from './components/ver-office/ver-office.component';

//Rutas
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //Si es localhost:4200 lo redirige al componente listaCountries
  { path: 'login', component: LoginComponent },
  //{
  //  path: 'dashboard',
  //  loadChildren: () => import('./components/dashboard/dashboard.module').then( d => d.DashboardModule )
  //},
  
  { path: 'listaCountries', component: ListaCountryComponent },
  { path: 'listaOffices', component: ListaOfficeComponent },
  { path: 'agregarCountry', component: AgregarEditarCountryComponent},
  { path: 'verCountry/:countryId', component: VerCountryComponent}, // ":id" es el parametro que le pasara cuando el usuario le de clic a un pais
  { path: 'editarCountry/:countryId', component: AgregarEditarCountryComponent},
  { path: 'editarCountry/:countryId', component: AgregarEditarCountryComponent },
  { path: 'agregarOffice', component: AgregarEditarOfficeComponent},
  { path: 'verCountry/:countryId', component: VerCountryComponent},
  { path: 'verOffice/:officeId', component: VerOfficeComponent}, // ":id" es el parametro que le pasara cuando el usuario le de clic a un pais
  { path: 'editarCountry/:countryId', component: AgregarEditarCountryComponent},
  { path: 'editarOffice/:officeId', component: AgregarEditarOfficeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'homeAdm', component: HomeAdmComponent },
  { path: 'users', component: UsersComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: '**', redirectTo:'login', pathMatch: 'full'} //Si no hace match con nada lo redirige al componente listaCountries
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    DashboardRoutingModule
  ],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }