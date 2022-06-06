import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './LoginService';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  
    constructor(public loginService: LoginService, public router: Router) {}


  canActivate(): boolean {
    if (!this.loginService.getUserStorage()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  canActivateChild(): boolean {
    if (!this.loginService.getUserStorage()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}