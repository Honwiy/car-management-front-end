import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CustomerManagementComponent } from './customer-management/customer-management.component'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from '../basic/home/home.component'
import { SharedModule } from '../shared/shared.module'
import { CarInformationManagementComponent } from './car/car-information-management/car-information-management.component'
import { CarSellingPriceManagementComponent } from './car/car-selling-price-management/car-selling-price-management.component'

export const routes: Routes = [
  {
    path: 'data-management',
    component: HomeComponent,
    children: [
      {
        path: 'customerManagement',
        component: CustomerManagementComponent,
      },
      {
        path: 'carInformationManagement',
        component: CarInformationManagementComponent
      },
      {
        path: 'carSellingPriceManagement',
        component: CarSellingPriceManagementComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
      CustomerManagementComponent
    , CarInformationManagementComponent
    , CarSellingPriceManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes, { useHash: true })
  ]
})
export class DataManagementModule { }
