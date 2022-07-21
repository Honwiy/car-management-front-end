import { Injectable } from '@angular/core'
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  public convertDateToTimestamp(date: any) {
    return moment(date).valueOf().toString()
  }

}

export enum DateType {
  StartTime = 'startTime',
  EndTime = 'endTime',
  PurchaseOrderingDate = 'purchaseOrderingDate',
  PlanningDate = 'planningDate',
  BillingEndDate = 'billingEndDate'
}

export enum PurchaseOrderingItemType {
  CarItem = 'carItem',
  AfterSalesItem = 'afterSalesItem',
  DerivativeItem = 'derivativeItem',
  FinanceApprovedItem = 'financeApprovedItem'
}
