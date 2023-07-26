import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: string | undefined;
  email: string | undefined;
  localUser: string="";
  constructor(private profileService: ProfileService) {}

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
      },
      (error) => {
        console.error('Error al obtener el perfil:', error);
      }
    );
  }
}








