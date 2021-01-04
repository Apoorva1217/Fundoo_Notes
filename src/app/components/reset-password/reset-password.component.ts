import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  hide = true;
  errors;
  Password = new FormControl('', [
    Validators.minLength(8),
    Validators.required,
  ]);

  getPasswordErrorMsg() {
    return this.Password.hasError('required')
      ? 'Password is Required'
      : 'please enter valid Password';
  }
  constructor(private user: UserService, public route: Router, public snackBar: MatSnackBar) { }

  reset() {
    let userData = {
      "newPassword": this.Password.value
    }
    this.user.resetPassword(userData).subscribe(response => {
      console.log(response)
      if (response['data'].success == true) {
        this.snackBar.open("password change successfully", 'success', { duration: 2000 })
        this.route.navigate(['login'])
      }
    },
      error => {
        this.snackBar.open("error please check inputs.", 'failed', { duration: 2000 })
      })
  }
}
