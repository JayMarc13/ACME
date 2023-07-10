import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private _loginService : LoginService) {
    this.form = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  

  ngOnInit(): void {
  }

  public submitForm() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }

    const login: Login = {
      userName: this.form.value.user,
      password: this.form.value.password
    };

    console.log(login);

    this._loginService.userLogin(login).subscribe((data) => {
      console.log(data);
    }, (error) => {
      this.error(); 
      this.form.reset();
    });

    
  }


  public get f():any {
    return this.form.controls;
  }

  error() {
    this.snackBar.open('User or password incorrect', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}
