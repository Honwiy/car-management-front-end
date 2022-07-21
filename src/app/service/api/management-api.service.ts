import { Injectable } from '@angular/core'
import { HttpService } from './http.service'

@Injectable({
  providedIn: 'root'
})
export class ManagementApiSerbice {
  baseUrl = `http://localhost:3000/api`
  constructor(
    private http: HttpService
  ) { }

  public fetchCarSellingPriceMapping(filter: any) {
    const url = `${this.baseUrl}/data-management/fetchCarSellingPriceMapping`
    return this.http.PostPromise(url, filter)
  }

}
