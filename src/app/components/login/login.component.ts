import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  errors;
  constructor(private user: UserService, public snackBar: MatSnackBar, public route: Router) { }

  Email = new FormControl('', [Validators.email, Validators.required]);
  Password = new FormControl('', [
    Validators.minLength(8),
    Validators.required,
  ]);

  getEmailErrorMessage() {
    return this.Email.hasError('required')
      ? 'Email is Required'
      : 'please enter valid email';
  }

  getPasswordErrorMessage() {
    return this.Password.hasError('required')
      ? 'Password is Required '
      : 'Password should be minimum of 8 characters';
  }
  ngOnInit(): void {
  }

  login() {
    let userData = {
      "email": this.Email.value,
      "password": this.Password.value
    }
    this.user.loginUser(userData).subscribe(response => {
      localStorage.setItem("token", response['id'])
      localStorage.setItem("name", response['firstName'])
      localStorage.setItem("email", response['email'])
      console.log(response)
      console.log(localStorage.getItem("id"))
      console.log(localStorage.getItem("name"))
      console.log(localStorage.getItem("email"))
      if (response['id']) {
        this.snackBar.open("login successfully.", 'success',{duration:2000})
        this.route.navigate(['dashboard/notes'])
      }
    },
      error => {
        this.snackBar.open("login unsuccessfully.", 'failed',{duration:2000})
      })
  }
}
