import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { CarDropdownList, CarPropertyItem } from '../../service/common/general-option.service'
import { StoreHouseService } from '../store-house.service'
import { CarPurchaseOrdering, CarPropertyItemList, PurchaseOrderingService } from '../../service/common/purchase-ordering.service'
import { CommonService, DateType } from '../../service/common/common.service'
import { StoreHouseApiService } from '../../service/api/store-house-api.service'
import { GeneralOptionService } from '../../service/common/general-option.service'
import { DropdownCategory, DropdownFunctionName, CarPurchaseOrderingStatus } from '../../shared/mapping/shared'
import { DialogService } from '../../service/common/dialog.service'
import * as moment from 'moment'
import { AuthService } from 'src/app/service/auth/auth.service'
import { Car, CarService } from 'src/app/sales/services/car.service'

@Component({
  selector: 'app-car-purchase-ordering',
  templateUrl: './car-purchase-ordering.component.html',
  styleUrls: ['./car-purchase-ordering.component.sass']
})

export class CarPurchaseOrderingComponent implements OnInit {

  carPurchaseOrderingForm: FormGroup
  carDropdownList: Array<CarDropdownList>
  brandDropdownList: Array<Object>
  seriesDropdownList: Array<Object>
  seriesSubList: Array<Object>
  typeDropdownList: Array<Object>
  typeSubList: Array<Object>
  configurationDropdownList: Array<Object>
  colorDropdownList = []
  transmissionDropdownList = []
  carTypeCategoryDropdownList = []
  carPurchaseOrdering: CarPurchaseOrdering = {}

  nzFilterOption = () => true

  constructor(
    private storeHouseService: StoreHouseService
    , private storeHouseApiService: StoreHouseApiService
    , private generalOptionService: GeneralOptionService
    , private fb: FormBuilder
    , private dialogService: DialogService
    , private router: Router
    , private auth: AuthService
    , private commonService: CommonService
    , private purchaseOrderingSerivce: PurchaseOrderingService
    , private carService: CarService
  ) { }

  async ngOnInit() {
    this.carPurchaseOrdering.purchaseOrderingCode = this.carPurchaseOrdering.purchaseOrderingCode ? this.carPurchaseOrdering.purchaseOrderingCode : this.initPurchaseOrderingCode()
    this.carPurchaseOrderingForm = this.fb.group({
      checkOrderingCode: [{value: null, disabled: true}],
      checkBrand: [null, [Validators.required]],
      checkSeries: [null, [Validators.required]],
      checkType: [null, [Validators.required]],
      checkTypeCode: [{value: null, disabled: true}, [Validators.nullValidator]],
      checkTypeCategory: [null, [Validators.required]],
      checkColor: [null, [Validators.required]],
      checkPurchaseOrderingDate: [null, [Validators.required]],
      checkPlanningDate: [null, [Validators.required]],
      checkGearboxType: [null, [Validators.required]],
      checkPurchaseOrderingCount: [null, [Validators.required]]
    })
    this.generalOptionService.getDropdownByCategory(DropdownCategory.Car).then((result: any) => {
      this.carDropdownList = result.data
      this.brandDropdownList = this.setCarNonRelatedDropdown(DropdownFunctionName.Brand)
      this.colorDropdownList = this.setCarNonRelatedDropdown(DropdownFunctionName.CarColor)
      this.transmissionDropdownList = this.setCarNonRelatedDropdown(DropdownFunctionName.Transmission)
      this.carTypeCategoryDropdownList = this.setCarNonRelatedDropdown(DropdownFunctionName.CarTypeCategory)
      // this.colorDropdownList = this.setCarColorDropDown()
      // this.transmissionDropdownList = this.setTransmissionDropDown()
      // this.carTypeCategoryDropdownList = this.setCarTypeCategoryDropDown()
    })
  }

  // setBrandDropdown() {
  //   if (this.carDropdownList !== undefined ) {
  //     let result = new Array<object>()
  //     this.carDropdownList.forEach((generalOption: CarDropdownList) => {
  //       if (generalOption.PropertyCode === DropdownFunctionName.Brand) {
  //         result = generalOption.CarPropertyItems
  //       }
  //     })
  //     return result
  //   }
  // }

  setCarNonRelatedDropdown(dropdownType: string) {
    if (this.carDropdownList !== undefined) {
      let result = new Array<object>()
      this.carDropdownList.forEach((generalOption: CarDropdownList) => {
        if (generalOption.PropertyCode === dropdownType) {
          result = generalOption.CarPropertyItems
        }
      })
      return result
    }
  }

  selectBrand(value: any) {
    if (value !== undefined) {
      this.carPurchaseOrdering.carSeries = undefined
      this.carPurchaseOrdering.carType = undefined
      this.carPurchaseOrdering.carTypeCode = undefined
      this.carPurchaseOrdering.carTypeCategory = undefined
      this.carPurchaseOrdering.carColor = undefined
      this.carPurchaseOrdering.transmission = undefined
      const selectedBrand: any = this.brandDropdownList.filter((item: CarPropertyItem) => {
        return item.PropertyItemCode === value
      })
      this.seriesDropdownList = this.generalOptionService.setCarRelatedDropdown(this.carDropdownList, selectedBrand, DropdownFunctionName.CarSeries)
    }
  }

  selectCarSeries(value: any) {
    if (value !== undefined) {
      this.carPurchaseOrdering.carType = undefined
      this.carPurchaseOrdering.carTypeCode = undefined
      this.carPurchaseOrdering.carTypeCategory = undefined
      this.carPurchaseOrdering.carColor = undefined
      this.carPurchaseOrdering.transmission = undefined
      const selectedCarSeries: any = this.seriesDropdownList.filter((item: CarPropertyItem) => {
        return item.PropertyItemCode === value
      })
      this.typeDropdownList = this.generalOptionService.setCarRelatedDropdown(this.carDropdownList, selectedCarSeries, DropdownFunctionName.CarType)
    }
  }

  selectCarType(value: any) {
    if (value !== undefined) {
      this.carPurchaseOrdering.carColor = undefined
      this.carPurchaseOrdering.transmission = undefined
      const selectedCarType: any = this.typeDropdownList.filter((item: CarPropertyItem) => {
        return item.PropertyItemCode === value
      })
      this.carPurchaseOrdering.carTypeCode = selectedCarType[0].PropertyItemCode
    }
  }

  selectCarTypeCategory(value: any) {
    if (value !== undefined) {
      this.carPurchaseOrdering.carColor = undefined
      this.carPurchaseOrdering.transmission = undefined
    }
  }

  submitForm() {
    let inValidField = 0
    for (const i of Object.keys(this.carPurchaseOrderingForm.controls)) {
      this.carPurchaseOrderingForm.controls[i].markAsDirty()
      this.carPurchaseOrderingForm.controls[i].updateValueAndValidity()
      if (!this.carPurchaseOrderingForm.controls[i].disabled && !this.carPurchaseOrderingForm.controls[i].valid) {
        inValidField++
      }
    }
    return inValidField
  }


  async saveCarPurchaseOrdering() {
    const invalidNum = this.submitForm()
    if (invalidNum > 0) {
      return
    }
    const now = new Date()
    this.carPurchaseOrdering.createdDate = moment(now).format('YYYY-MM-DD HH:mm:ss').toLocaleString()
    this.carPurchaseOrdering.createdBy = this.auth.passport.userInfo.Username
    this.carPurchaseOrdering.updatedDate = moment(now).format('YYYY-MM-DD HH:mm:ss').toLocaleString()
    this.carPurchaseOrdering.updatedBy = this.auth.passport.userInfo.Username
    this.carPurchaseOrdering.purchaseOrderingStatus = CarPurchaseOrderingStatus.Applied
    let carItemList: CarPropertyItemList = this.purchaseOrderingSerivce.initCarPropertyItemList(this.carPurchaseOrdering)
    // TODO: init car item
    let car: Car = this.carService.initCarModel()
    car.createdDate = this.carPurchaseOrdering.createdDate
    car.createdBy = this.carPurchaseOrdering.createdBy
    car.updatedDate = this.carPurchaseOrdering.updatedDate
    car.updatedBy = this.carPurchaseOrdering.updatedBy
    const result: any = await this.storeHouseApiService.saveCarPurchaseOrdering(this.carPurchaseOrdering, carItemList, car)
    if (result.isSuccess) {
      this.dialogService.success('提交成功', '表单提交成功，请等待财务审批').then(res => this.router.navigate(['home']))
    } else {
      this.dialogService.error('提交失败', '表单提交失败，请重试')
    }
  }

  initPurchaseOrderingCode() {
    const date = new Date()
    const orderingCode = moment(date).format('YYYYMMDDHHmmss')
    return orderingCode
  }

  changeDateTime(result: Date, dateType: string): void {
    if (result !== undefined) {
      switch (dateType) {
        case DateType.PlanningDate:
          this.carPurchaseOrdering.purchaseOrderingPlanningDate = moment(result).format('YYYY-MM-DD HH:mm:ss')
          break
        case DateType.PurchaseOrderingDate:
          this.carPurchaseOrdering.purchaseOrderingDate = moment(result).format('YYYY-MM-DD HH:mm:ss')
          break
        default:
          break
      }
    }
  }
}
