import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: 'homeAdm',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'bookings',
        loadChildren: () => import('./bookings/bookings.module').then(m => m.BookingsModule)
      },
      {
        path: 'meetingRoom',
        loadChildren: () => import('./meeting-room/meeting-room.module').then(m => m. MeetingRoomModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'admRooms',
        loadChildren: () => import('./adm-rooms/adm-rooms.module').then(m => m.AdmRoomsModule)
      },
      {
        path: 'formReserve',
        loadChildren: () => import('./form-reserve/form-reserve.module').then(m => m.formReserveModule)
      },
      {
        path: 'editarReserve',
        loadChildren: () => import('./form-reserve/form-reserve.module').then(m => m.formReserveModule)
      },
      {
        path: 'help',
        loadChildren: () => import('./help/help.module').then(m => m.HelpModule)
      },
      { path: '', redirectTo: '/home/homeAdm', pathMatch: 'full' }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
