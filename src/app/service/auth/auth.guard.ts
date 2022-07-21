import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router'
import { AuthService, LoginStatus } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | Promise<boolean> {
    if (this.auth.loginStatus === LoginStatus.TokenNone) {
      return false
    }

    if (this.auth.loginStatus === LoginStatus.TokenExpired) {
      return false
    }

    return true
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return true
  }
}
