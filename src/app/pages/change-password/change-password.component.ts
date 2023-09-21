import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

constructor(private _profileService: ProfileService){}

ngOnInit(){
  const password = sessionStorage.getItem('*');
  console.log(password);
}
}
