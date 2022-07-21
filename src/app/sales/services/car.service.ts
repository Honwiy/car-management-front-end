import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }

  public initCarModel(): Car {
    const car: Car = {}
    return car
  }
}

export interface Car {
  storeHouseId?: number
  originStoreHouseId?: number
  isActive?: number
  purchaseOrderingPrice?: number
  standardSellPrice?: number
  vinNumber?: string
  engineNumber?: string
  batteryPackNumber?: string
  gearboxNumber?: string
  announcementNumber?: string
  certificateNumber?: string
  certificateLocation?: string
  arriveStoreDate?: string
  storeDateCount?: number
  isThirdParty?: number
  carStoreHouseStatus?: string
  carStatus?: string
  sellingStatus?: string
  productionDate?: string
  manufacturedDate?: string
  createdDate?: string
  createdBy?: string
  updatedDate?: string
  updatedBy?: string
}
