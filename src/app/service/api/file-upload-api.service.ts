import { Customer } from '../../sales/sales.service'
import { Injectable } from '@angular/core'
import { HttpService } from './http.service'

@Injectable({
  providedIn: 'root'
})
export class FileUploadApiService {
  baseUrl = `http://localhost:3000/api`
  constructor(
    private http: HttpService
  ) { }

  public carInfoUpload(type: string, formData) {
    const url = `${this.baseUrl}/car-info-import/${type}`
    // let formData: FormData = new FormData()
    // files.forEach(file => {
    //   formData.append(fileName, file._file, file._file.name)
    // })
    console.log(formData)
    return this.http.PostPromise(url, formData)
    // const searchList = {searchList: requestBody}
    // return this.http.PostPromise(url, searchList)
  }

}
