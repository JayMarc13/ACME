import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { Login } from '../../interfaces/login';
import { tokenUser } from '../../interfaces/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  token: tokenUser | undefined;
  eslogan = 'Booking has never been easier.';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) {
    this.form = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }


  ngOnInit(): void {
  }

  submitForm(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }

    const login: Login = {
      userName: this.form.value.user,
      email: this.form.value.user,
      password: this.form.value.password
    };

    this.loginService.userLogin(login).subscribe(
      (data: tokenUser | undefined) => {
        this.token = data;
        const tokenUser = this.token?.token;
        if (tokenUser) {
          localStorage.setItem('token', tokenUser);
        }
        this.router.navigate(['/home']);
      },
      (error: any) => {
        this.error();
        this.form.reset();
      }
    );
      localStorage.setItem('user', this.form.value.user);
  }

  get f(): any {
    return this.form.controls;
  }

  error(): void {
    this.snackBar.open('User or password incorrect', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
