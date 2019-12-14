import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService  } from "../userService/user.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  authData: any = {};
  credentials: any;
  response: any;
  constructor(private userservice: UserService, private toastr: ToastrService, private router: Router) {}

  ngOnInit() {
    this.buildFormGroup()
    this.authData = {};
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/orders');
    }
  }
  get f(): any {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.credentials = this.loginForm.value;
    this.userservice.login(this.credentials).subscribe(res => {
      this.response = JSON.parse(res._body);
      if (this.response.auth === false) {
        Swal.fire({
          title: 'Invalid User name/Password',
          text: 'Please enter correct username and password',
          type: 'error',
        });
      } else {
        localStorage.setItem('token', this.response.token);
        this.router.navigateByUrl('/orders');
      }
    })
  }
  buildFormGroup() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
}
