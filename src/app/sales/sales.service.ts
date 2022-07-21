import { Injectable } from '@angular/core'
import { AuthService } from '../service/auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  constructor(
    private auth: AuthService
  ) {

  }

  public createPresent(): Present {
    return {
      name: '',
      isFree: '',
      presentNumber: '',
      presentPrice: '',
      presentPaidWay: '',
      presentComment: ''
    }
  }

  public createCarOrderPrice(): CustomerOrder {
    return {
      firstPrice: {},
      carPrice: {},
      orderPrice: {},
      arrearPrice: {},
      servicePrice: {},
      presentPrice: {},
      helpLicensePrice: {},
      helpTaxPrice: {},
      greenBoxPrice: {},
      helpGreenPrice: {},
    }
  }
  public createCustomer(): Customer {
    return {
      Name: '',
      CustomerNumber: '',
      CustomerPhoneNumber: '',
      IdentityCard: '',
      DistrictId: null,
      CustomerSourceId: null
    }
  }

  public initCarInsuranceInfo(): CarInsuranceInfo {
    return {
      orderingNumber: null,
      insuranceCompany: '',
      customerType: '',
      accidentIns: false,
      carDamageIns: false,
      thirdPartyIns: null,
      driverIns: null,
      passengerIns: null,
      stolenIns: false,
      glassIns: false,
      scratchIns: false,
      fireIns: false,
      waterIns: false,
      findThirdPartyIns: false
    }
  }
}

export interface Present {
  name?: string,
  isFree?: string,
  presentNumber?: string,
  presentPrice?: string,
  presentPaidWay?: string,
  presentComment?: string
}

export interface CustomerOrder {
  firstPrice?: PaySubject,
  carPrice?: PaySubject,
  orderPrice?: PaySubject,
  arrearPrice?: PaySubject,
  servicePrice?: PaySubject,
  presentPrice?: PaySubject,
  helpLicensePrice?: PaySubject,
  helpTaxPrice?: PaySubject,
  greenBoxPrice?: PaySubject,
  helpGreenPrice?: PaySubject,
}

export interface CarInsuranceInfo {
  orderingNumber?: number,
  insuranceCompany?: string,
  customerType?: string,
  accidentIns?: boolean,
  carDamageIns?: boolean,
  thirdPartyIns?: number,
  driverIns?: number,
  passengerIns?: number,
  stolenIns?: boolean,
  glassIns?: boolean,
  scratchIns?: boolean,
  fireIns?: boolean,
  waterIns?: boolean,
  findThirdPartyIns?: boolean
}

export interface PaySubject {
  price?: string,
  payWay?: string,
  comment?: string,
}

export interface Customer {
  Id?: number
  BrandId?: number
  SalesEmployeeId?: number
  Name?: string
  CustomerNumber?: string
  CustomerPhoneNumber?: string
  IdentityCard?: string
  DistrictId?: number
  CustomerSourceId?: number
}

export interface CarOrdering {
  orderingNumber?: string
  carId?: number
  salesEmployeeId?: number
  customerNumber?: string
  additionalOrderId?: number
  discountName?: string
  discountPercentage?: number
  insuranceId?: number
  tradingStatus?: string
  salesType?: string
  paymentType?: number // 0-全款， 1-分期
  orderPrice?: number
  firstPaid?: number
  carPrice?: number
  arrearPaidPrice?: number
  serviceCharge?: number
  derivativePrice?: number
  agentLicensePrice?: number
  agentTaxPrice?: number
  agentGreenBookPrice?: number
  greenBookDeposit?: number
  orderPaidWay?: number
  firstPaidWay?: number
  carPricePaidWay?: number
  arrearPaidWay?: number
  serviceChargePaidWay?: number
  derivativePaidWay?: number
  agentLicensePaidWay?: number
  agentTaxPaidWay?: number
  agentGreenBookPaidWay?: number
  greenBookDepositPaidWay?: number
  orderPriceComment?: string
  firstPaidComment?: string
  carPriceComment?: string
  arrearPaidPriceComment?: string
  serviceChargeComment?: string
  derivativePriceComment?: string
  agentLicensePriceComment?: string
  agentTaxPriceComment?: string
  agentGreenBookPriceComment?: string
  greenBookDepositComment?: string
  isActived?: number
  createdDate?: string
  createdBy?: string
  updatedDate?: string
  updatedBy?: string
}

export interface SearchFilter {
  Name?: string
  CustomerPhoneNumber?: string
  IdentityCard?: string
  BrandId?: number
}

export interface CustomerQueryCreteria {
  UserId?: number
  FuncitonName?: string
  BrandId?: string
}

export interface GeneralOption {
  Id?: number
  BrandId?: number
  FuncitonName?: string
  Name?: string
  PermissionId?: number
  isActive?: number
  Category?: string
  ParentId?: number
  Code?: string
  SubName?: string
}
