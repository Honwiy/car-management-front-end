import { Component, OnInit } from '@angular/core'
import { CarPurchaseOrdering, PurchaseOrderingService } from 'src/app/service/common/purchase-ordering.service'

enum CAR_INFO_IMPORT_TYPE {
  CHERRYPURCHASEORDERING = 'cherryPurchaseOrdering',
  CHERRYINSTOREHOUSE = 'cherryInStoreHouse',
  BYDPURCHASEORDERING = 'bydPurchaseOrdering',
  BYDINSTOREHOUSE = 'bydInStoreHouse'
}

@Component({
  selector: 'app-car-information-import',
  templateUrl: './car-information-import.component.html',
  styleUrls: ['./car-information-import.component.sass']
})

export class CarInformationImportComponent implements OnInit {
  carInfoImportType: string
  // carPurchaseOrderingInfoList: Array<any>
  isSpinning = false
  constructor(
    // private carPurchaseOrderingService: PurchaseOrderingService
  ) { }

  ngOnInit() {
    // 初始化车辆数据导入类型
    this.carInfoImportType = CAR_INFO_IMPORT_TYPE.CHERRYPURCHASEORDERING
  }

  changeFileUploadType(e) {
    console.log(e)
  }

  switchSpinning(uploadStatus: boolean) {
    this.isSpinning = uploadStatus
  }
  // openFile(event: any): void {
  //   const input = event.target
  //   const reader = new FileReader()
  //   reader.onload = (() => {
  //     if (reader.result) {
  //       console.log(reader.result)
  //       const array = reader.result.toString().split(/\n/)
  //       array.filter((line: string) => line.trim() !== '').forEach((line: string) => {
  //         let carInfoResultItem: CarPurchaseOrdering = this.carPurchaseOrderingService.initCarInfoImportItem()
  //         const item = line.split(',')

  //         carInfoResultItem.purchaseOrderingCode = item[0]
  //         carInfoResultItem.carType = item[2]
  //         carInfoResultItem.carTypeCategory = item[3]
  //         carInfoResultItem.carTypeCode = item[5]
  //         carInfoResultItem.carSeries = item[6]
  //         carInfoResultItem.carColor = item[8]
  //         carInfoResultItem.purchaseOrderingDate = item[12]
  //         carInfoResultItem.purchaseOrderingPlanningDate = item[13]
  //         carInfoResultItem.carSweptVolume = item[15]
  //         carInfoResultItem.transmission = item[16]
  //         carInfoResultItem.purchaseOrderingCount = item[17]
  //         carInfoResultItem.startPrice = item[22]
  //         carInfoResultItem.purchaseOrderingTotalPrice = item[23]
  //         carInfoResultItem.preSellingPrice = item[27]
  //         carInfoResultItem.paymentType = item[29]
  //         carInfoResultItem.billingNumber = item[30]
  //         carInfoResultItem.cooperationBank = item[31]
  //         carInfoResultItem.billingPrice = item[32]
  //         carInfoResultItem.billingStartDate = item[33]
  //         carInfoResultItem.billingEndDate = item[34]
  //         carInfoResultItem.productionAddress = item[39]
  //         carInfoResultItem.productName = item[46]

  //         this.carPurchaseOrderingInfoList.push(carInfoResultItem)
  //       })
  //     }
  //     console.log(this.carPurchaseOrderingInfoList)
  //   })
  //   reader.readAsText(input.files[0], 'utf-8')
  // }

}
