import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { EditarProfileComponent } from '../editar-profile/editar-profile.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  localUser: string="";
  constructor(private profileService: ProfileService, public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(EditarProfileComponent, {});
  }


  ngOnInit() {
    const nombreEmail = sessionStorage.getItem('user');
    if(nombreEmail != null){
      this.localUser = nombreEmail;
    }

    this.profileService.getUserProfile(this.localUser).subscribe(
      (profileData) => {
        // Aquí obtienes los detalles del perfil del usuario y los asignas a las propiedades user y email.
        this.user = profileData.userName;
        this.email = profileData.email;
        this.phone = profileData.phoneNumber;
      },
      (error) => {
        console.error('Error al obtener el perfil:', error);
      }
    );
  }
}









