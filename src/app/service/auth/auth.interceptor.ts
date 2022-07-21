import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service'
import { Observable } from 'rxjs'
import { Brand } from '../../shared/mapping/shared'
// import { environment } from '../../../environments/environment'


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth && this.auth.passport && this.auth.passport.id_token) {
      const access_token = `Bearer ${this.auth.passport.id_token}`
      // const state = environment.role
      let authReq = req.clone({
        headers: req.headers.set('Authorization', access_token)
          // .set('state', state)
      })
      let role = ''
        // if (state === State.buyer && this.auth.passport.buyer) {
        //    role = this.auth.passport.buyer.RoleCode
        // } else if (state === State.supplier && this.auth.passport.supplierMember) {
        //    role = this.auth.passport.supplierMember.RoleCode
        // }
        if (role) {
          authReq = req.clone({
            headers: req.headers.set('Authorization', access_token)
              // .set('state', state)
              .set('role', role)
          })
        }
      return next.handle(authReq)
    }
    return next.handle(req)
  }
}
