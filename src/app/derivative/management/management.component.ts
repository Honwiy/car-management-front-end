import { Component, OnInit } from '@angular/core'
import { DerivativeList, DerivativeItem, DerivativeService } from '../derivative.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { DerivativeApiService } from 'src/app/service/api/derivative-api.service'
import * as moment from 'moment'
import { AuthService } from 'src/app/service/auth/auth.service'
import { DialogService } from '../../service/common/dialog.service'

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.sass']
})
export class ManagementComponent implements OnInit {

  derivativeCategoryList: Array<DerivativeList>
  pageIndex = 1
  pageSize = 7
  derivativeItem: DerivativeItem
  isShowDetailDerivativeItem: Boolean = false
  isShowDerivativeList: Boolean = true
  derivativeItemForm: FormGroup
  derivativeCodeList: Array<String> = []
  derivativeTextList: Array<String> = []
  childDerivativeCodeList: string
  childDerivativeTextList: string
  derivativeDetailList: Array<DerivativeItem>
  categoryId

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private derivativeApiService: DerivativeApiService,
    private authService: AuthService,
    private dialogService: DialogService,
    private derivativeService: DerivativeService
  ) { }

  async ngOnInit() {
    this.derivativeItemForm = this.fb.group({
      checkItemCode: [null, [Validators.required]],
      checkItemText: [null, [Validators.required]],
      checkItemUnit: [null, [Validators.required]],
      checkItemPrice: [null, [Validators.required]],
      checkItemStatus: [null, [Validators.required]],
      checkCreatedDate: [{ value: null, disabled: true }],
      checkCreatedBy: [{ value: null, disabled: true }],
      checkUpdatedDate: [{ value: null, disabled: true }],
      checkUpdatedBy: [{ value: null, disabled: true }],
      // checkPurchaseOrderingCount: [null, [Validators.required]]
    })
    const result: any = await this.derivativeApiService.loadDerivativeList()
    if (result.isSuccess) {
      this.derivativeCategoryList = result.result
    }
    this.initDerivativeFirstList()
  }



  initDerivativeFirstList() {
    this.derivativeDetailList = this.derivativeCategoryList[0].derivativeItemList
    for (const item of this.derivativeDetailList) {
      this.derivativeCodeList.push(item.itemCode)
      this.derivativeTextList.push(item.itemText)
    }
  }

  selectCategory(categoryId, categoryItemList) {
    this.derivativeCodeList = []
    this.derivativeTextList = []
    this.derivativeDetailList = categoryItemList
    this.categoryId = categoryId
    for (const item of categoryItemList) {
      this.derivativeCodeList.push(item.itemCode)
      this.derivativeTextList.push(item.itemText)
    }
  }

  changeChildDerivativeList(derivativeItemList) {
    console.log(this.childDerivativeCodeList);
    const filterFunc = (item: DerivativeItem) =>
      (this.childDerivativeCodeList ? item.itemCode.indexOf(this.childDerivativeCodeList) !== -1 : true) &&
      (this.childDerivativeTextList ? item.itemText.indexOf(this.childDerivativeTextList) !== -1 : true)
    this.derivativeDetailList = derivativeItemList.filter(item => filterFunc(item))
  }

  editApprovalItem(derivativeItemId) {
    for (const derivativeCategory of this.derivativeCategoryList) {
      for (const derivativeItem of derivativeCategory.derivativeItemList) {
        if (derivativeItem.id === derivativeItemId) {
          this.derivativeItem = derivativeItem
        }
      }
    }

    this.isShowDetailDerivativeItem = true
    this.isShowDerivativeList = false
    return
  }

  backToDerivativeList() {
    this.isShowDetailDerivativeItem = false
    this.isShowDerivativeList = true
  }

  async updateDerivativeList() {
    const invalidNum = this.submitForm()
    if (invalidNum > 0) {
      return
    }
    const now = new Date()
    this.derivativeItem.updatedDate = moment(now).format('YYYY-MM-DD HH:mm:ss').toLocaleString()
    this.derivativeItem.updatedBy = this.authService.passport.userInfo.Username
    const result: any = await this.derivativeApiService.updateDerivativeItem(this.derivativeItem, this.categoryId)
    if (result.isSuccess) {
      this.dialogService.success('更新成功', '成功修改精品信息').then(res => {
        this.isShowDetailDerivativeItem = false
        this.isShowDerivativeList = true
      })
    } else {
      this.dialogService.error('更新失败', '更新失败，请重试')
    }
  }

  submitForm() {
    let inValidField = 0
    // tslint:disable-next-line: forin
    for (const i in this.derivativeItemForm.controls) {
      this.derivativeItemForm.controls[i].updateValueAndValidity()
      if (this.derivativeItemForm.controls[i].dirty && !this.derivativeItemForm.controls[i].valid) {
        inValidField++
      }
    }
    return inValidField
  }

  addNewItem(id) {
    this.derivativeItem = this.derivativeService.createDerivativeItem()
    this.categoryId = id
    this.isShowDetailDerivativeItem = true
    this.isShowDerivativeList = false
  }

}
