import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http_service/http.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private _url = environment.apiUrl+"user/"

  constructor(private http: HttpService) {
  }

  registerUser(data) {
    let url = this._url + "userSignUp"
    return this.http.postService(data, url)
  }

  loginUser(data) {
    let url = this._url + "login"
    return this.http.postService(data, url)
  }

  resetPassword(data) {
    let url = this._url + "reset-password"
    return this.http.postService(data, url)
  }

  resetMail(data) {
    let url = this._url + "reset"
    return this.http.postService(data, url)
  }

  logout(data) {
    let url = this._url + "logout"
    return this.http.postService(data, url)
  }
}
