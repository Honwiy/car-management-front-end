import { SystemsettingModule } from './../systemsetting/systemsetting.module';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home/home.component'
import { RouterModule, Routes } from '@angular/router'
import { registerLocaleData } from '@angular/common'
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd'
import { HttpClientModule } from '@angular/common/http'
import zh from '@angular/common/locales/zh'
import { SalesModule } from '../sales/sales.module'
import { FinanceModule } from '../finance/finance.module'
import { AfterSalesModule } from '../after-sales/after-sales.module'
import { DerivativeModule } from '../derivative/derivative.module'
import { AdministratorModule } from '../administrator/administrator.module'
import { StoreHouseModule } from '../store-house/store-house.module'
import { SharedModule } from '../shared/shared.module'
import Passport from '../service/auth/passport'
import { DataManagementModule } from '../data-management/data-management.module'

registerLocaleData(zh)

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SalesModule,
    FinanceModule,
    AfterSalesModule,
    DerivativeModule,
    AdministratorModule,
    StoreHouseModule,
    SystemsettingModule,
    DataManagementModule,
    SharedModule
  ],
  providers: [
    Passport
  ]
})
export class BasicModule { }
