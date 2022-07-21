import { Injectable } from '@angular/core'
import { HttpService } from './http.service'

@Injectable({
  providedIn: 'root'
})
export class GeneralOptionApiService {
  baseUrl = `http://localhost:3000/api`
  constructor(
    private http: HttpService
  ) { }

  public getDropdownByCategory(category: string) {
    const url = `${this.baseUrl}/generaloption/getDropDownListByCategory/${category}`
    return this.http.GetPromise(url)
  }

}
