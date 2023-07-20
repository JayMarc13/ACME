import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.css']
})
export class AddEditUsersComponent implements OnInit {
  formm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private _UsersService: UsersService) {
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

    const user: users = {
      userName: this.formm.value.user,
      email: this.formm.value.email,
      password: this.formm.value.password
    };

    console.log(user);

    this._UsersService.adduser(user)
      .subscribe(
        () => {
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400) {
            alert("Los parametros introducidos tienen un error")
          } else {
            window.location.href = '/addUser';  
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
