import { Component } from '@angular/core';
import  jwt_decode from '../../../../node_modules/jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  ngOnInit(){
    const token = localStorage.getItem('token');
    console.log(token);
    
  }
}
