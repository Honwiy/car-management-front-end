import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CarPurchaseOrderingComponent } from './car-purchase-ordering/car-purchase-ordering.component'
import { SharedModule } from '../shared/shared.module'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from '../basic/home/home.component'
import { GeneralOptionResolver } from '../service/resolve/generalOption.resolver.service';
import { CarInformationImportComponent } from './car-information-import/car-information-import.component'

export const routes: Routes = [
  {
    path: 'store-house',
    resolve: {
      generalOptionResolver: GeneralOptionResolver
    },
    component: HomeComponent,
    children: [
      {
        path: 'carPurchaseOrdering',
        component: CarPurchaseOrderingComponent,
      },
      {
        path: 'carInformationImport',
        component: CarInformationImportComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    CarPurchaseOrderingComponent,
    CarInformationImportComponent,
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
export class StoreHouseModule { }
