import { NzInputModule } from 'ng-zorro-antd/input'
import { SalesService, CarOrdering } from './../../../sales.service'
import { SalesApiService } from '../../../../service/api/sales-api.service'
import { CommonApiService } from '../../../../service/api/common-api.service'
import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { Customer, SearchFilter, CustomerQueryCreteria } from '../../../sales.service'
import * as dayjs from 'dayjs'
import { DropdownFunctionName } from '../../../../shared/mapping/shared'
import Passport from 'src/app/service/auth/passport'
import { UserService } from 'src/app/basic/user.service'
import { REGEXP } from '../../../../shared/utils/regExp'
import { DialogService } from 'src/app/service/common/dialog.service'
import { GeneralOptionService } from 'src/app/service/common/general-option.service'
import { OrderingTradingStatus } from 'src/app/shared/mapping/ordering.mapping'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.sass']
})
export class CustomerComponent implements OnInit {
  value: string
  validateForm: FormGroup
  customerSearchForm: FormGroup
  controlArray: any[] = []
  show = true
  path: void
  customer: Customer
  search: any[] = []
  customerList: any
  filter: SearchFilter = {
    Name: '许',
    CustomerPhoneNumber: '153'
  }
  isShowList = false
  isShowDetail = false
  customerEditable = false
  editableCustomerFlag: boolean
  newCustomerFlag: boolean
  pageIndex = 1
  pageSize = 7
  searchLimitedError = false
  districtList: any
  customerSourceList: any
  customerQueryCreteria: CustomerQueryCreteria

  initCustomer() {
    this.customer = this.salesService.createCustomer()
    this.customer.CustomerNumber = this.customer.CustomerNumber ? this.customer.CustomerNumber : this.getInitCustomerNum()
  }

  toggleCollapse(): void {
    this.show = !this.show
  }
  // menuType = {
  //   Home: 'customer',
  //   Customer: 'ordering'
  // }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private salesApiService: SalesApiService,
    private salesService: SalesService,
    private commonApiService: CommonApiService,
    private userService: UserService,
    private passport: Passport,
    private dialogService: DialogService,
    private generalOptionService: GeneralOptionService
  ) { }

  resetForm(): void {
    this.customerSearchForm.reset()
  }


  ngOnInit(): void {

    this.initCustomer()
    this.getDistrictList()
    this.getCustomerSourceList()
    this.initCastomerForm()

    this.customerSearchForm = this.fb.group({
      searchName: [null],
      searchPhone: [null],
      searchCard: [null]
    })
    for (let i = 0; i < 10; i++) {
      this.controlArray.push({ index: i, show: i < 6 })
      this.validateForm.addControl(`customerName`, new FormControl())
    }
  }

  navigateTo(orderingNumber) {
    this.router.navigate(['sales/carinfo', orderingNumber])
  }

  async saveCustomer() {
    const invalidNum = this.submitForm()
    if (invalidNum > 0) {
      return
    }
    this.customer.BrandId = this.passport.getBrandId()
    this.customer.SalesEmployeeId = this.passport.userInfo.id
    const duplicatedCheckReq = {
      Name: this.customer.Name,
      IdentityCard: this.customer.IdentityCard,
      CustomerPhoneNumber: this.customer.CustomerPhoneNumber,
      BrandId: this.customer.BrandId
    }
    if (this.newCustomerFlag === true) {
      const duplicatedCustomerList: any = await this.salesApiService.searchCustomer(duplicatedCheckReq)
      if (duplicatedCustomerList.length > 0) {
        await this.dialogService.error('错误', '客户已存在于该品牌系统中，请勿重新录入')
        return
      }
    }
    // init car ordering object
    let carOrdering: CarOrdering = {}
    carOrdering.salesEmployeeId = this.passport.userInfo.id
    carOrdering.customerNumber = this.customer.CustomerNumber
    carOrdering.isActived = 1
    carOrdering.createdDate = dayjs().format('YYYY-MM-DD HH:MM:ss')
    carOrdering.createdBy = this.passport.userInfo.Username
    carOrdering.updatedDate = dayjs().format('YYYY-MM-DD HH:MM:ss')
    carOrdering.updatedBy = this.passport.userInfo.Username
    carOrdering.tradingStatus = OrderingTradingStatus.UnSubmittedOrder
    const result: any = await this.salesApiService.saveCustomerForCarOrdering(this.customer, carOrdering)
    const orderingNumber = result.result.OrderingNumber
    if (orderingNumber) {
      this.navigateTo(orderingNumber)
    }
  }

  async searchCustomer() {
    this.isShowDetail = false
    this.newCustomerFlag = false
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

  importCustomer(index: number, isLabelDisabled: boolean) {
    this.initCastomerForm(isLabelDisabled)
    this.editableCustomerFlag = !isLabelDisabled
    this.isShowList = false
    this.customer = this.customerList[index]
    this.isShowDetail = true
  }

  initCastomerForm(isLabelDisabled = false) {
    this.validateForm = this.fb.group({
      checkCustomerName: [{ value: null, disabled: isLabelDisabled }, [Validators.required]],
      checkIdentityCard: [{ value: null, disabled: isLabelDisabled }, [Validators.required, Validators.pattern(REGEXP.ID_CARD)]],
      checkDistrict: [{ value: null, disabled: isLabelDisabled }, [Validators.required]],
      checkCustomerSource: [{ value: null, disabled: isLabelDisabled }, [Validators.required]],
      checkPhone: [{ value: null, disabled: isLabelDisabled }, [Validators.required, Validators.pattern(REGEXP.PHONE_NUM)]],
      checkCustomerNum: [{ value: null, disabled: true }]
    })
  }

  createCustomer() {
    this.isShowList = false
    this.isShowDetail = true
    this.editableCustomerFlag = true
    this.newCustomerFlag = true
  }

  submitForm() {
    let inValidField = 0
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty()
      this.validateForm.controls[i].updateValueAndValidity()
      if (!this.validateForm.controls[i].valid && i !== 'checkCustomerNum' && this.editableCustomerFlag === true) {
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

  getInitCustomerNum() {
    // const date = new Date()
    const CustomerNumber = dayjs().format('YYYYMMDDHHmmss')
    return CustomerNumber
  }
}
