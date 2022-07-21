import { SalesApiService } from '../service/api/sales-api.service'
import { SalesService } from './sales.service'
import { CustomerComponent } from './view/newOrdering/customer/customer.component'
import { CarinfoComponent } from './view/newOrdering/carinfo/carinfo.component'
import { OrderingComponent } from './view/newOrdering/ordering/ordering.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from '../basic/home/home.component'
import { SharedModule } from '../shared/shared.module';
import { InsuranceInfoComponent } from './view/newOrdering/insurance-info/insurance-info.component'

export const routes: Routes = [
  {
    path: 'sales',
    component: HomeComponent,
    children: [
      {
        path: 'customer/:orderingNumber',
        component: CustomerComponent,

      }
      , {
        path: 'carinfo/:orderingNumber',
        component: CarinfoComponent,

      }
      , {
        path: 'insuranceinfo/:orderingNumber',
        component: InsuranceInfoComponent,
      }
      , {
        path: 'ordering/:orderingNumber',
        component: OrderingComponent,
      }
    ]
  }
]

@NgModule({
  declarations: [
    OrderingComponent,
    CustomerComponent,
    CarinfoComponent,
    InsuranceInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    SalesService,
    SalesApiService
  ]
})
export class SalesModule { }
