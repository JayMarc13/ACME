import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userslist: any[] = [
    {name: 'Veronica ',last:'cartagena', email:'vcj@gmail', },
    {name: 'Delia ',last:'Perez', email:'dcj@gmail', }
  ];

  form:FormGroup;

  constructor(private fb: FormBuilder,
  private toastr: ToastrService){
    this.form = this.fb.group({
      name: ['', Validators.required],
      last: ['', Validators.required],
      email: ['',Validators.required]
    })
  }
  addUser(){
    const usuarioNuevo: any = {
      name: this.form.get('name')?.value,
      last: this.form.get('last')?.value,
      email: this.form.get('email')?.value
    }
    this.userslist.push(usuarioNuevo);
    this.toastr.success('User added correctly', 'Register users');
    this.form.reset();
    
  }
  ngOnInit(): void{

  }
}
