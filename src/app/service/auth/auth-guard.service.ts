import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public route: Router) { }
  canActivate(): boolean {
    let token = localStorage.getItem('token');
    if (token === null || token === undefined ) {
      this.route.navigate(['login']);
      return false;
    }
    return true;
  }
}
