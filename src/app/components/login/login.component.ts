import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../interfaces/login';
import { tokenUser } from 'src/app/interfaces/token';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form: FormGroup;
    token: tokenUser | undefined;
 /* token?: tokenUser;*/
  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private _loginService: LoginService) {
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

    this._loginService.userLogin(login).subscribe((data: tokenUser | undefined) => {
      this.token = data;
      const tokenUser = this.token?.token;
      if (tokenUser) {
        localStorage.setItem('token', tokenUser);
      }
      window.open('/home');
    }, (error: any) => {
      this.error();
      this.form.reset();
    });


  }


  public get f(): any {
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
