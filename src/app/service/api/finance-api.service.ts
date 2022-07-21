import { Customer } from '../../sales/sales.service'
import { Injectable } from '@angular/core'
import { HttpService } from './http.service'

@Injectable({
  providedIn: 'root'
})
export class FinanceApiService {
  baseUrl = `http://localhost:3000/api`
  constructor(
    private http: HttpService
  ) { }

  public searchApprovalList(requestBody) {
    const url = `${this.baseUrl}/finance/searchApprovalList`
    const searchList = {searchList: requestBody}
    return this.http.PostPromise(url, searchList)
  }

}
