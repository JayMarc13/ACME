import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private router:Router) {
    this.form = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {
  }

  
  login(form: NgForm) {
    const user=form.value.user
    const password=form.value.password
  }

  public submitForm() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }
    console.log(this.form.value);
    this.router.navigate(['/homeAdm']);
    this.form.reset();
  }
  public get f():any {
    return this.form.controls;
  }
}
