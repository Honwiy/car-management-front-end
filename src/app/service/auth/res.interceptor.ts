import { Injectable, Injector } from '@angular/core'
import { HttpInterceptor, HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { HttpHeaderResponse } from '@angular/common/http'
import { catchError, mergeMap } from 'rxjs/operators'
import { Router } from '@angular/router'
import { AuthService } from './auth.service'
import { environment } from '../../../environments/environment'
import { resolve } from 'q'
import { DialogService } from '../common/dialog.service'
// import { LoadingService } from '../loading.service'
@Injectable()
export class ResInterceptor implements HttpInterceptor {
  constructor(private injector: Injector,
    private auth: AuthService,
    private dialogService: DialogService,
    // private loadingService: LoadingService
    ) { }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url))
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<| HttpHeaderResponse | HttpResponse<any>> {
    return next.handle(req).pipe(mergeMap((event: any) => {
      if (event instanceof HttpResponse && event.status === 200) {
        return this.handleData(event)
      }
      return of(event)
    }),
      catchError((err: HttpErrorResponse) => this.handleData(err)))
  }

  private handleData(
    event: HttpResponse<any> | HttpErrorResponse,
  ): Observable<any> {
    // if (event && event.url === this.loadingService.url) {
    //   console.log('event url ===>', event.url)
    //   this.loadingService.closeLoading()
    // }
    switch (event.status) {
      case 200:
        if (event instanceof HttpResponse) {
          const body: any = event.body
          if (body && body.isSuccess === false) {
            console.log(body.error.errorMessage)
          }
        }
        break
      case 401:
        if (event instanceof HttpErrorResponse) {
          console.log('token authentication fail', event.error || event.message)            // should be a general message
          this.dialogService.error('登陆失败', event.error.message)
        }
        break
      case 403:
        if (event instanceof HttpErrorResponse) {
          console.log('token authorization fail', event.error || event.message)            // should be a general message
        }
        break
      case 404:
        this.goTo(`/errors/${event.status}.html`)
        break
      case 405:
        if (event instanceof HttpErrorResponse) {
          console.log('token authentication fail', event.error || event.message)            // should be a general message
          this.dialogService.error('登陆验证信息失效，请重新登陆', event.error.message)
        }
        break
      case 500:
        if (event instanceof HttpErrorResponse) {
          console.log(event.error || event.message)            // should be a general message
        }
        break
      default:
        if (event instanceof HttpErrorResponse) {
          console.warn(
            event.message,          // should be a general message
            event
          )
        }
        break
    }
    return of(event)
  }
}
