import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'forgotPassword',
    loadChildren: () => import('./components/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/adm.module').then(m => m.AdmModule)
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
