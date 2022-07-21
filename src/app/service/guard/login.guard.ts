import { CanActivate } from '@angular/router'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/service/auth/auth.service'
export class LoginGuard implements CanActivate {
    constructor(
        private router: Router,
        private auth: AuthService
    ) { }

    canActivate() {
        let loggedIn: boolean = this.auth.isLoggedIn

        if (!loggedIn) {
            console.log('用户未登录')
            this.router.navigate(['login'])
        }
        return loggedIn
    }
}
