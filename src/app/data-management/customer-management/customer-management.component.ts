import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Customer, SearchFilter, SalesService, CustomerQueryCreteria } from 'src/app/sales/sales.service'
import { Router } from '@angular/router'
import { SalesApiService } from 'src/app/service/api/sales-api.service'
import { CommonApiService } from 'src/app/service/api/common-api.service'
import { UserService } from 'src/app/basic/user.service'
import Passport from 'src/app/service/auth/passport'
import { DialogService } from 'src/app/service/common/dialog.service'
import { REGEXP } from 'src/app/shared/utils/regExp'
import { DropdownFunctionName } from 'src/app/shared/mapping/shared'
import * as moment from 'moment'
import { GeneralOptionService } from 'src/app/service/common/general-option.service'

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.sass']
})
export class CustomerManagementComponent implements OnInit {

  value: string
  validateForm: FormGroup
  customerSearchForm: FormGroup
  controlArray: any[] = []
  show = true
  selectedValue: string
  path: void
  customer: Customer
  search: any[] = []
  customerList: any
  filter: SearchFilter = {}
  isShowList = false
  isShowDetail = false
  pageIndex = 1
  pageSize = 7
  searchLimitedError = false
  districtList: any
  customerSourceList: any
  customerQueryCreteria: CustomerQueryCreteria

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private salesApiService: SalesApiService,
    private salesService: SalesService,
    private commonApiService: CommonApiService,
    private generalOptionService: GeneralOptionService,
    private userService: UserService,
    private passport: Passport,
    private dialogService: DialogService
  ) { }

  resetForm(): void {
    this.customerSearchForm.reset()
  }


  ngOnInit(): void {
    this.getDistrictList()
    this.getCustomerSourceList()
    this.validateForm = this.fb.group({
      checkCustomerName: [null, [Validators.required]],
      checkIdentityCard: [null, [Validators.required, Validators.pattern(REGEXP.ID_CARD)]],
      checkDistrict: [null, [Validators.required]],
      checkCustomerSource: [null, [Validators.required]],
      checkPhone: [null, [Validators.required, Validators.pattern(REGEXP.PHONE_NUM)]],
      checkCustomerNum: [{value: null, disabled: true}]
    })
    this.customerSearchForm = this.fb.group({
      searchName: [null],
      searchPhone: [null, [Validators.pattern(REGEXP.PHONE_NUM)]],
      searchCard: [null, [Validators.pattern(REGEXP.ID_CARD)]]
    })
    for (let i = 0; i < 10; i++) {
      this.controlArray.push({ index: i, show: i < 6 })
      this.validateForm.addControl(`customerName`, new FormControl())
    }
  }

  async saveCustomer() {
    const invalidNum = this.submitForm()
    if (invalidNum > 0) {
      return
    }
    this.customer.BrandId = this.passport.getBrandId()
    this.customer.SalesEmployeeId = this.passport.userInfo.Id

    const result: any = await this.salesApiService.saveCustomer(this.customer)
    const customerId = result.result.Id
    // TODO: show a popup to let user know if this customer is updated or not
    if (customerId) {
      const udpatedRes: any = await this.dialogService.success('成功', '更新客户信息成功')
      if (udpatedRes) {
        this.router.navigate(['home'])
      }
    }
  }

  async searchCustomer() {
    this.isShowDetail = false
    let vaildFilterCount = 0
    if (this.filter.Name) {
      vaildFilterCount++
    }
    if (this.filter.CustomerPhoneNumber) {
      vaildFilterCount++
    }
    if (this.filter.IdentityCard) {
      vaildFilterCount++
    }

    if (vaildFilterCount > 1) {
      this.isShowList = true
      this.searchLimitedError = false
      this.filter.BrandId = this.passport.getBrandId()
      this.customerList = await this.salesApiService.searchCustomer(this.filter)
    } else {
      this.searchLimitedError = true
      this.isShowList = false
    }
  }

  editCustomer(index) {
    this.isShowList = false
    this.customer = this.customerList[index]
    console.log(typeof this.customer.DistrictId, this.customer.DistrictId)
    console.log(typeof this.customerSourceList[0].Id, this.customerSourceList[0].Id)
    this.isShowDetail = true
  }

  createCustomer() {
    this.isShowList = false
    this.isShowDetail = true
  }

  submitForm() {
    let inValidField = 0
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty()
      this.validateForm.controls[i].updateValueAndValidity()
      console.log(i, this.validateForm.controls[i].valid, this.validateForm.get(i).errors)
      if (!this.validateForm.controls[i].valid && i !== 'checkCustomerNum') {
        inValidField++
      }
    }
    return inValidField
  }

  async getDistrictList() {
    this.districtList = await this.generalOptionService.getDropdownByCode(DropdownFunctionName.District)
  }

  async getCustomerSourceList() {
    this.customerSourceList = await this.generalOptionService.getDropdownByCode(DropdownFunctionName.CustomerSource)
  }

}
