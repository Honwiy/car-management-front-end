import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class PurchasingApprovalService {

  constructor() { }
}

export interface SearchApprovalList {
  brand?: string
  startTime?: string
  endTime?: string
}
