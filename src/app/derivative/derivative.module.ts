import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ManagementComponent } from './management/management.component'
import { AdvancedProductSalesComponent } from './advanced-product-sales/advanced-product-sales.component'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from '../basic/home/home.component'
import { SharedModule } from '../shared/shared.module'

export const routes: Routes = [
  {
    path: 'derivative',
    component: HomeComponent,
    children: [
      {
        path: 'management',
        component: ManagementComponent,
      },
      {
        path: 'advancedProductSales',
        component: AdvancedProductSalesComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    ManagementComponent,
    AdvancedProductSalesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes, { useHash: true })
  ]
})
export class DerivativeModule { }
