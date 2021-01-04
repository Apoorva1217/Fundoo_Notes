import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class forgotPassword implements OnInit {
  constructor(private user: UserService, public route: Router, public snackBar: MatSnackBar) { }
  Email = new FormControl('', [Validators.email, Validators.required]);
  ngOnInit(): void {
  }

  getEmailErrorMessage() {
    return this.Email.hasError('required')
      ? 'Email is Required'
      : 'please enter valid email';
  }

  reset() {
    let emailData = {
      "email": this.Email.value
    }
    return this.user.resetMail(emailData).subscribe(response => {
      console.log(response)
      if (response['success'] == true) {
        this.snackBar.open("", 'success',{duration:2000})
        this.route.navigate(['resetpassword/:id'])
      }
    },
      error => {
        this.snackBar.open("email not send.", 'failed',{duration:2000})
      }
    )
  }
}