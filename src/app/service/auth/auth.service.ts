import { Injectable, EventEmitter } from '@angular/core'
import { Observable, of } from 'rxjs'
import { tap, delay } from 'rxjs/operators'
import Passport from './passport'
// import { SupplierService } from '../supplier.service'
// import { BuyerService } from '../buyer.service'
import { Router } from '@angular/router'
import { UserService } from 'src/app/basic/user.service'
// import { environment } from '../../../environments/environment'
// import { CommonService } from '../common.service'
// import { ButtonItem, DialogType, DialogService } from '../dialog.service'
export enum LoginStatus {
  TokenExpired,
  TokenNone,
  Success
}

const CONSTANTS = {
  EXPIRES_IN: 'exp',
  ID_TOKEN: 'id_token',
  ACCESS_TOKEN: 'access_token',
  USER_PROFILE: 'user_profile',
  USER_PROFILE_ID: 'userProfileId',
  ROLES: 'user_roles',
  CODE: 'code',
  STATE: 'state'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  passport: Passport // current user info
  loginStatus: LoginStatus = LoginStatus.TokenNone
  loginCompleted: EventEmitter<any> = new EventEmitter()
  initCompleted: EventEmitter<any> = new EventEmitter()
  ACL_Completed: EventEmitter<any> = new EventEmitter()
  isOtherUser: Boolean = false
  isACL = false
  isLoggedIn = false

  // store the URL so we can redirect after logging in
  redirectUrl: string
  constructor(
    private router: Router,
    private userService: UserService,

  ) {
    this.passport = new Passport()
  }

  async loginLocal() {
    if (!this.passport.id_token) {
      this.loginStatus = LoginStatus.TokenNone
      return
    }
    // const checkTokenResult = await this.commonService.checkTokenExpired()
    // if (!checkTokenResult) {
    //   this.loginStatus = LoginStatus.TokenExpired
    //   return
    // }
  }



  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    )
  }

  logout(): void {
    this.isLoggedIn = false
  }
}
