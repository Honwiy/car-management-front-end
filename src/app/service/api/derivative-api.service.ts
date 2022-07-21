import { Customer } from '../../sales/sales.service'
import { Injectable } from '@angular/core'
import { HttpService } from './http.service'

@Injectable({
  providedIn: 'root'
})
export class DerivativeApiService {
  baseUrl = `http://localhost:3000/api`
  constructor(
    private http: HttpService
  ) { }

  public loadDerivativeList() {
    const url = `${this.baseUrl}/derivative/loadDerivativeList`
    return this.http.GetPromise(url)
  }

  public updateDerivativeItem(derivativeItem, categoryId?: any) {
    const url = `${this.baseUrl}/derivative/updateDerivativeItem`
    const data = {
      derivativeItem,
      categoryId
    }
    return this.http.PostPromise(url, data)
  }

}
