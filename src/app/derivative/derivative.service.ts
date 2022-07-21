import { Injectable } from '@angular/core'
import * as moment from 'moment'
import { AuthService } from '../service/auth/auth.service'
@Injectable({
  providedIn: 'root'
})
export class DerivativeService {

  constructor(
    private authService: AuthService
  ) { }

  createDerivativeItem(): DerivativeItem {
    const now = new Date()
    return {
      itemCode: '',
      itemText: '',
      itemUnit: '',
      itemPrice: null,
      status: null,
      createdDate: moment(now).format('YYYY-MM-DD HH:mm:ss').toLocaleString(),
      createdBy: this.authService.passport.userInfo.Username,
      updatedDate: moment(now).format('YYYY-MM-DD HH:mm:ss').toLocaleString(),
      updatedBy: this.authService.passport.userInfo.Username
    }
  }

}


export interface DerivativeList {
  id?: number
  categoryCode?: string
  categoryText?: string
  status?: number
  derivativeItemList?: Array<DerivativeItem>
  createdDate?: string
  createdBy?: string
  updatedDate?: string
  updatedBy?: string
}

export interface DerivativeItem {
  id?: number
  itemCode?: string
  itemText?: string
  itemUnit?: string
  itemPrice?: number
  status?: number
  createdDate?: string
  createdBy?: string
  updatedDate?: string
  updatedBy?: string
}
