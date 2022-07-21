import { CarPurchaseOrdering, CarPropertyItemList } from '../common/purchase-ordering.service'
import { Injectable } from '@angular/core'
import { HttpService } from './http.service'
import { Car } from 'src/app/sales/services/car.service'

@Injectable({
  providedIn: 'root'
})
export class StoreHouseApiService {
  baseUrl = `http://localhost:3000/api`
  constructor(
    private http: HttpService
  ) { }

  public saveCarPurchaseOrdering(carPurchaseOrdering: CarPurchaseOrdering, carItemMappingList?: CarPropertyItemList, car?: Car) {
    const url = `${this.baseUrl}/store-house/saveCarPurchaseOrdering`
    const data = {carPurchaseOrdering, carItemMappingList, car}
    return this.http.PostPromise(url, data)
  }

  public updateCarPurchaseOrdering(carPurchaseOrdering: any) {
    const url = `${this.baseUrl}/store-house/updateCarPurchaseOrdering`
    const data = {carPurchaseOrdering}
    return this.http.PostPromise(url, data)
  }

}
