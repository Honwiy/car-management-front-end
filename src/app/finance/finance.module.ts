import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PurchasingApprovalComponent } from './purchasing-approval/layout/purchasing-approval.component'
import { SharedModule } from '../shared/shared.module'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from '../basic/home/home.component'
import { CarPurchaseApprovalComponent } from './purchasing-approval/car-purchase-approval/car-purchase-approval.component'
import { AftersalesPurchaseApprovalComponent } from './purchasing-approval/aftersales-purchase-approval/aftersales-purchase-approval.component'
import { DerivativePurchaseApprovalComponent } from './purchasing-approval/derivative-purchase-approval/derivative-purchase-approval.component'
import { GeneralOptionResolver } from '../service/resolve/generalOption.resolver.service'

export const routes: Routes = [
  {
    path: 'financial',
    resolve: {
      generalOptionResolver: GeneralOptionResolver
    },
    component: HomeComponent,
    children: [
      {
        path: 'purchasingApproval',
        component: PurchasingApprovalComponent,
      }
    ]
  }
]

@NgModule({
  declarations: [
    PurchasingApprovalComponent,
    CarPurchaseApprovalComponent,
    AftersalesPurchaseApprovalComponent,
    DerivativePurchaseApprovalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    GeneralOptionResolver
  ]
})

export class FinanceModule { }
