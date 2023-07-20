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

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getUserProfile().subscribe(
      (profileData) => {
        // Aquí obtienes los detalles del perfil del usuario y los asignas a las propiedades user y email.
        this.user = profileData.name;
        this.email = profileData.mail;
      },
      (error) => {
        console.error('Error al obtener el perfil:', error);
      }
    );
  }
}








