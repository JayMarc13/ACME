import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../../interfaces/register';
import { tokenUser } from 'src/app/interfaces/token';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterService } from '../../services/register.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  eslogan: string = "Booking has never been easier";
  formm: FormGroup;
    token: tokenUser | undefined;
 /* token?: tokenUser;*/
  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private _registerService: RegisterService) {
    this.formm = this.fb.group({
      user: ['', [Validators.required]],
      email: ['', [ Validators.email]],
      password: ['', [Validators.required]]
    })
  }



  ngOnInit(): void {
  }

  public submitForm() {
    if (this.formm.invalid) {
      Object.values(this.formm.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }

    const register: Register = {
      userName: this.formm.value.user,
      email: this.formm.value.email,
      password: this.formm.value.password
    };

    console.log(register);

    this._registerService.userRegister(register)
      .subscribe(
        () => {
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400) {
            alert("Mal")
          } else {
            window.location.href = '/login';  
          }
        }  
      );


  }


  public get f(): any {
    return this.formm.controls;
  }

  error() {
    this.snackBar.open('The account or password is wrong', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}
