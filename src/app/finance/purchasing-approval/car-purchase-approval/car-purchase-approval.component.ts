import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { CarPurchaseOrdering } from '../../../service/common/purchase-ordering.service'
import { CommonService, DateType, PurchaseOrderingItemType } from '../../../service/common/common.service'
import { StoreHouseApiService } from 'src/app/service/api/store-house-api.service'
import { DialogService } from 'src/app/service/common/dialog.service'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/service/auth/auth.service'
import { CommonApiService } from '../../../service/api/common-api.service'
import { DropdownFunctionName, CarPurchaseOrderingStatus, DropdownCategory } from 'src/app/shared/mapping/shared'
import { SearchApprovalList } from '../purchasing-approval.service'
import { FinanceApiService } from '../../../service/api/finance-api.service'
import * as moment from 'moment'
import { GeneralOptionService } from 'src/app/service/common/general-option.service'

@Component({
  selector: 'app-car-purchase-approval',
  templateUrl: './car-purchase-approval.component.html',
  styleUrls: ['./car-purchase-approval.component.sass']
})

export class CarPurchaseApprovalComponent implements OnInit {

  searchPurchaseApprovalForm: FormGroup
  carPurchaseOrderingForm: FormGroup
  brandDropDown: any
  paymentTypeDropDown: any
  cooperationBankDropDown: any
  isShowSearchList = false
  isShowPurchaseOrderingDetail = false
  isShowPurchaseOrderingItem = true
  isShowFinanceApprovalItem = true
  carPurchaseOrderingApprovalList: Array<CarPurchaseOrdering>
  carPurchaseOrderingItem: CarPurchaseOrdering = {}
  searchPurchaseApproval: SearchApprovalList = {}
  pageIndex = 1
  pageSize = 7

  nzFilterOption = () => true

  constructor(
    private storeHouseApiService: StoreHouseApiService
    , private fb: FormBuilder
    , private dialogService: DialogService
    , private commonService: CommonService
    , private router: Router
    , private auth: AuthService
    , private commonApiService: CommonApiService
    , private financeApiService: FinanceApiService
    , private generalOptionService: GeneralOptionService
  ) { }

  async ngOnInit() {
    this.brandDropDown = await this.commonApiService.getOneDropdownListByCode(DropdownFunctionName.Brand)
    this.paymentTypeDropDown = await this.commonApiService.getOneDropdownListByCode(DropdownFunctionName.PaymentType)
    this.cooperationBankDropDown = await this.commonApiService.getOneDropdownListByCode(DropdownFunctionName.CooperationBank)
    this.searchPurchaseApprovalForm = this.fb.group({
      brand: [this.searchPurchaseApproval.brand],
      startTime: [this.searchPurchaseApproval.startTime],
      endTime: [this.searchPurchaseApproval.endTime]
    })

    this.carPurchaseOrderingForm = this.fb.group({
      //  申请数据
      checkOrderingCode: [{ value: null, disabled: true }],
      checkBrand: [{ value: null, disabled: true }],
      checkSeries: [{ value: null, disabled: true }],
      checkType: [{ value: null, disabled: true }],
      checkTypeCode: [{ value: null, disabled: true }],
      checkTypeCategory: [{ value: null, disabled: true }],
      checkColor: [{ value: null, disabled: true }],
      checkCarCount: [{ value: null, disabled: true }],
      checkPurchaseOrderingDate: [{ value: null, disabled: true }],
      checkPlanningDate: [{ value: null, disabled: true }],
      checkGearboxType: [{ value: null, disabled: true }],
      checkPurchaseOrderingCount: [{ value: null, disabled: true }],
      // 审批数据
      checkStartPrice: [null, [Validators.required]],
      checkTotalPrice: [null, [Validators.required]],
      checkPaymentType: [null, [Validators.required]],
      checkBillingNumber: [null, [Validators.required]],
      checkCooperationBank: [null, [Validators.required]],
      checkBillingPrice: [null, [Validators.required]],
      checkBillingEndDate: [null, [Validators.required]]
    })
  }

  toggleCollapse(type) {
    switch (type) {
      case PurchaseOrderingItemType.CarItem:
        this.isShowPurchaseOrderingItem = !this.isShowPurchaseOrderingItem
        break
      default:
        this.isShowFinanceApprovalItem = !this.isShowFinanceApprovalItem
        break
    }
  }

  changeDateTime(result: Date, dateType: string): void {
    if (result !== undefined) {
      switch (dateType) {
        case DateType.StartTime:
          this.searchPurchaseApproval.startTime = moment(result).format('YYYY-MM-DD HH:mm:ss')
          break
        case DateType.EndTime:
          this.searchPurchaseApproval.endTime = moment(result).format('YYYY-MM-DD HH:mm:ss')
          break
        case DateType.BillingEndDate:
          this.carPurchaseOrderingItem.billingEndDate = moment(result).format('YYYY-MM-DD HH:mm:ss')
          break
        default:
          break
      }
    }
  }

  async searchApprovalList() {
    const result: any = await this.financeApiService.searchApprovalList(this.searchPurchaseApproval)
    if (result.isSuccess) {
      this.isShowSearchList = true
      this.isShowPurchaseOrderingDetail = false
      this.carPurchaseOrderingApprovalList = result.result
    }
  }

  clearApprovalItem() {
    delete this.searchPurchaseApproval.brand
    delete this.searchPurchaseApproval.startTime
    delete this.searchPurchaseApproval.endTime
  }

  editApprovalItem(searchListIndex) {
    this.isShowSearchList = false
    this.carPurchaseOrderingItem = this.carPurchaseOrderingApprovalList[(this.pageIndex - 1) * this.pageSize + searchListIndex]
    const tempCarMappingList = {}
    for (const key of Object.keys(this.carPurchaseOrderingItem.carPropertyItemMapping.carPropertyItemList)) {
      tempCarMappingList[key.toLowerCase()] = this.carPurchaseOrderingItem.carPropertyItemMapping.carPropertyItemList[key]
    }
    this.generalOptionService.resultCache[DropdownCategory.Car].forEach(generalOptionItem => {
      const lowerCaseCode = generalOptionItem.PropertyCode.toLowerCase()
      const tempItem = generalOptionItem.CarPropertyItems.filter((item: any) => {
        return item.PropertyItemCode === tempCarMappingList[lowerCaseCode]
      })
      this.carPurchaseOrderingItem[lowerCaseCode] = tempItem[0].PropertyItemText
    })
    this.isShowPurchaseOrderingDetail = true
  }

  rejectApprovalItem(searchListIndex) {
    this.carPurchaseOrderingItem = this.carPurchaseOrderingApprovalList[(this.pageIndex - 1) * this.pageSize + searchListIndex]
    this.updatePurchaseOrderingItem(this.carPurchaseOrderingItem, CarPurchaseOrderingStatus.Rejected)
  }

  submitForm() {
    let inValidField = 0
    // tslint:disable-next-line: forin
    for (const i in this.carPurchaseOrderingForm.controls) {
      this.carPurchaseOrderingForm.controls[i].updateValueAndValidity()
      if (this.carPurchaseOrderingForm.controls[i].dirty && !this.carPurchaseOrderingForm.controls[i].valid) {
        inValidField++
      }
    }
    return inValidField
  }

  async approvedPurchaseOrdering() {
    const invalidNum = this.submitForm()
    if (invalidNum > 0) {
      return
    }
    this.updatePurchaseOrderingItem(this.carPurchaseOrderingItem, CarPurchaseOrderingStatus.Approved)
  }

  backToApprovedList() {
    this.isShowSearchList = true
    this.isShowPurchaseOrderingDetail = false
  }

  async updatePurchaseOrderingItem(carPurchaseOrdering: CarPurchaseOrdering, approvedTag: string) {
    const now = new Date()
    carPurchaseOrdering.updatedDate = moment(now).format('YYYY-MM-DD HH:mm:ss').toLocaleString()
    carPurchaseOrdering.updatedBy = this.auth.passport.userInfo.Username
    carPurchaseOrdering.purchaseOrderingStatus = approvedTag
    let result: any
    if (carPurchaseOrdering.purchaseOrderingStatus === CarPurchaseOrderingStatus.Rejected) {
      const popupRes: any = await this.dialogService.confirm('警告', '是否拒绝改申请？')
      if (!popupRes) {
        return
      }
    }
    // TODO: approve car purchase ordering
    result = await this.storeHouseApiService.updateCarPurchaseOrdering(carPurchaseOrdering)
    if (result.isSuccess) {
      const dialogMessage = carPurchaseOrdering.purchaseOrderingStatus === CarPurchaseOrderingStatus.Rejected ? '采购申请已拒绝' : '采购申请已通过'
      this.dialogService.success('审批完成', dialogMessage).then(async res => {
        const newRes: any = await this.financeApiService.searchApprovalList(this.searchPurchaseApproval)
        if (newRes.isSuccess) {
          this.carPurchaseOrderingApprovalList = newRes.result
          this.isShowSearchList = true
          this.isShowPurchaseOrderingDetail = false
        }
      })
    } else {
      this.dialogService.error('提交失败', '表单提交失败，请重试')
    }
  }

}
