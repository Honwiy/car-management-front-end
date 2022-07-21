import { Customer, CarOrdering } from '../../sales/sales.service'
import { Injectable } from '@angular/core'
import { HttpService } from './http.service'

@Injectable({
  providedIn: 'root'
})
export class SalesApiService {
  baseUrl = `http://localhost:3000/api`
  constructor(
    private http: HttpService
  ) { }

  public saveCustomerForCarOrdering(customer: Customer, carOrdering: CarOrdering) {
    const url = `${this.baseUrl}/sales/saveCustomerForCarOrdering`
    const data = { customer, carOrdering }
    return this.http.PostPromise(url, data)
  }

  public saveCarOrdering(carInfo: CarOrdering) {
    const url = `${this.baseUrl}/sales/saveCarOrdering`
    return this.http.PostPromise(url, carInfo)
  }

  public saveInsuranceInfo(insuranceInfo: any) {
    const url = `${this.baseUrl}/derivative/saveOrderingInsuranceInfo`
    return this.http.PostPromise(url, insuranceInfo)
  }

  public saveCustomer(customer: Customer) {
    const url = `${this.baseUrl}/customer/saveCustomer`
    const data = { customer }
    return this.http.PostPromise(url, data)
  }

  public searchCustomer(filter) {
    const url = `${this.baseUrl}/customer/findList`
    const filterConst = { filter }
    return this.http.PostPromise(url, filterConst)
  }

  public fetchOnSaleCarList(filter) {
    const url = `${this.baseUrl}/car/fetchOnSaleCarList`
    return this.http.PostPromise(url, filter)
  }

  public fetchCarByOrderingNumber(orderingNumber): Promise<CarOrdering> {
    const url = `${this.baseUrl}/car/fetchCarByOrderingNumber/${orderingNumber}`
    return this.http.GetPromise(url)
  }

  public getDropDownList(filter) {
    const url = `${this.baseUrl}/generaloption/findList`
    const filterConst = { filter }
    console.log(filter)
    return this.http.PostPromise(url, filterConst)
  }

}
