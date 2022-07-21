import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient) {
  }

  GetPromise<T>(url): Promise<T> {
    return this.http.get<T>(url).toPromise()
  }

  PostPromise<T>(url, data): Promise<T> {
    return this.http.post<T>(url, data).toPromise()
  }

  PutPromise<T>(url, data): Promise<T> {
    // return this.http.put<T>(url, data, { headers: new HttpHeaders({ timeout: '120000' }) }).toPromise()
    return this.http.put<T>(url, data).toPromise()
  }

  PutPromiseTimeOut<T>(url, data): Promise<T> {
    return this.http.put<T>(url, data, { headers: new HttpHeaders({ timeout: '180000' }) }).toPromise()
  }

  DeletePromise<T>(url): Promise<T> {
    return this.http.delete<T>(url).toPromise()
  }
}
