import { LoginGuard } from './service/guard/login.guard'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd'
import { NzListModule } from 'ng-zorro-antd/list'
import { NzFormModule } from 'ng-zorro-antd/form'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { registerLocaleData } from '@angular/common'
import zh from '@angular/common/locales/zh'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './basic/login/login.component'
import { BasicModule } from './basic/basic.module'
import { HomeComponent } from './basic/home/home.component'
import { HttpService } from './service/api/http.service'
import { DialogService } from './service/common/dialog.service'
import { SharedModule } from './shared/shared.module'
import { WebSocketService } from './service/common/websocket.service';


registerLocaleData(zh)

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [LoginGuard] }
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    NzListModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    BasicModule, NzFormModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    HttpService,
    DialogService,
    LoginGuard,
    WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
