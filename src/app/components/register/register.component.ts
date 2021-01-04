import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  hide = true;
  errors;
  constructor(private user: UserService, public route: Router, public snackBar: MatSnackBar) {
  }
  ConfirmpassValidation(control: AbstractControl) {
    if (control && (control.value != null || control.value != undefined)) {
      const passConfirmValue = control.value;
      const passControl = control.root.get('passFormControl')
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== passConfirmValue) {
          return {
            isError: true
          }
        }
      }
    }
  }
  Email = new FormControl('', [Validators.email, Validators.required]);
  Password = new FormControl('', [
    Validators.minLength(8),
    Validators.required,]);
  FirstName = new FormControl("", [
    Validators.pattern('[a-zA-Z]{2,}')]);
  LastName = new FormControl("", [
    Validators.pattern('[a-zA-Z]{2,}')]);
  ConfirmPassword = new FormControl("", [this.ConfirmpassValidation])


  getEmailErrorMsg() {
    return this.Email.hasError('required')
      ? 'Email is Required'
      : 'please enter valid email';
  }


  getFirstNameErrorMsg() {
    return this.FirstName.hasError('required')
      ? 'FirstName is Required'
      : 'please enter valid FirstName';
  }

  getLastNameErrorMsg() {
    return this.LastName.hasError('required')
      ? 'LastName is Required'
      : 'please enter valid LastName';
  }

  getPasswordErrorMsg() {
    return this.Password.hasError('required')
      ? 'Password is Required'
      : 'please enter valid Password';
  }
  getConfirmPasswordErrorMsg() {
    this.ConfirmPassword.hasError("ConfirmpassValidation")
      ? 'ConfirmPassword is Required'
      : 'Password and ConfirmPassword do not match';
  }

  ngOnInit(): void { }
  register() {
    let userdata = {
      "firstName": this.FirstName.value,
      "lastName": this.LastName.value,
      "service": "advance",
      "email": this.Email.value,
      "password": this.Password.value,
    }
    this.user.registerUser(userdata).subscribe(response => {
      if (response['data'].success == true) {
        this.snackBar.open("register successfully", 'success',{duration:2000})
        this.route.navigate(['login'])
      }
    },
      error => {
        this.snackBar.open("register unsuccessfully.", 'failed',{duration:2000})
      }
    )
  }
}
