import { Customer } from '../../sales/sales.service'
import { Injectable } from '@angular/core'
import { HttpService } from './http.service'

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {
  baseUrl = `http://localhost:3000/api`
  constructor(
    private http: HttpService
  ) { }

  public getDropDownList(filter) {
    const url = `${this.baseUrl}/generaloption/findList`
    const filterConst = { filter }
    return this.http.PostPromise(url, filterConst)
  }

  public getOneDropdownListByCode(filter) {
    const url = `${this.baseUrl}/generaloption/findOneDropdownList`
    const filterConst = { filter }
    return this.http.PostPromise(url, filterConst)
  }

}
