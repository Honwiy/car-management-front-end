import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isDisable: boolean
  constructor() {
    this.isDisable = false
  }

  openLoading() {
    this.isDisable = true
  }

  closeLoading() {
    this.isDisable = false
  }
}
