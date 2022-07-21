import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderingService {

  constructor() { }

  public initCarPropertyItemList(carPropertyItemList: CarPropertyItemList) {
    const carItemList: CarPropertyItemList = {}
    carItemList.brand = carPropertyItemList.brand
    carItemList.carSeries = carPropertyItemList.carSeries
    carItemList.carType = carPropertyItemList.carType
    carItemList.carTypeCategory = carPropertyItemList.carTypeCategory
    carItemList.carTypeCode = carPropertyItemList.carTypeCode
    carItemList.transmission = carPropertyItemList.transmission
    carItemList.carColor = carPropertyItemList.carColor
    return carItemList
  }

  public initCarInfoImportItem() {
    const carImportItem: CarPurchaseOrdering = {}
    carImportItem.carType = ''
    carImportItem.purchaseOrderingCode = ''
    carImportItem.carTypeCategory = ''
    carImportItem.carTypeCode = ''
    carImportItem.carSeries = ''
    carImportItem.carColor = ''
    carImportItem.purchaseOrderingDate = ''
    carImportItem.purchaseOrderingPlanningDate = ''
    carImportItem.carSweptVolume = ''
    carImportItem.transmission = ''
    carImportItem.purchaseOrderingCount = ''
    carImportItem.startPrice = ''
    carImportItem.purchaseOrderingTotalPrice = ''
    carImportItem.preSellingPrice = ''
    carImportItem.paymentType = ''
    carImportItem.billingNumber = ''
    carImportItem.cooperationBank = ''
    carImportItem.billingPrice = ''
    carImportItem.billingStartDate = ''
    carImportItem.billingEndDate = ''
    carImportItem.productionAddress = ''
    carImportItem.productName = ''
    return carImportItem
  }
}

export interface CarPurchaseOrdering {
  purchaseOrderingCode?: string
  // 订单编号
  purchaseOrderingNumber?: string
  // 品牌
  brand?: string
  // 车系
  carSeries?: string
  // 车型
  carType?: string
  // 车辆型号
  carTypeCode?: string
  // 车型分类
  carTypeCategory?: string
  // 车身颜色
  carColor?: string
  // 波箱方式
  transmission?: string
  // 排量
  carSweptVolume?: string
  carPropertyItemMapping?: any
  // 车辆订购日期
  purchaseOrderingDate?: string
  // 计划日期
  purchaseOrderingPlanningDate?: string
  // 采购数量
  purchaseOrderingCount?: string
  // 车辆起价(订购价)
  startPrice?: string
  // 总金额
  purchaseOrderingTotalPrice?: string
  // 车辆金额(预售价)
  preSellingPrice?: string
  // 采购状态
  purchaseOrderingStatus?: string
  // 付款类型
  paymentType?: string
  // 汇票号
  billingNumber?: string
  // 合作银行
  cooperationBank?: string
  // 汇票金额
  billingPrice?: string
  // 汇票开始日期
  billingStartDate?: string
  // 汇票到期日期
  billingEndDate?: string
  // 产地
  productionAddress?: string
  // 产品名称 = 车辆型号+车型
  productName?: string
  createdDate?: string
  createdBy?: string
  updatedDate?: string
  updatedBy?: string
}

export interface CarPropertyItemList {
  brand?: string
  carSeries?: string
  carType?: string
  carTypeCode?: string
  carTypeCategory?: string
  transmission?: string
  carColor?: string
}
