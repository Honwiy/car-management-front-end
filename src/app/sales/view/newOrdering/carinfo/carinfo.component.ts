import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { GeneralOptionService, CarPropertyItem, CarDropdownList } from 'src/app/service/common/general-option.service'
import { DropdownCategory, DropdownFunctionName, CarPurchaseOrderingStatus } from '../../../../shared/mapping/shared'
import Passport from 'src/app/service/auth/passport'
import * as FileSaver from 'file-saver'
import { SalesApiService } from 'src/app/service/api/sales-api.service'
import { REGEXP } from 'src/app/shared/utils/regExp'
import { CarOrdering } from '../../../sales.service'
import * as dayjs from 'dayjs'
import { SalesType } from 'src/app/shared/mapping/ordering.mapping'
import { DialogService } from 'src/app/service/common/dialog.service'

@Component({
  selector: 'app-carinfo',
  templateUrl: './carinfo.component.html',
  styleUrls: ['./carinfo.component.sass']
})
export class CarinfoComponent implements OnInit {
  value: string
  carInfoSearchForm: FormGroup
  carSelectionForm: FormGroup
  carDropdownList: Array<CarDropdownList>
  currentBrandDropdownItem: CarPropertyItem
  carSeriesDropdownList: Array<Object>
  carTypeDropdownList: Array<Object>
  carColorDropdownList: Array<Object>
  isCarListModalVisible: Boolean = false
  isConfirmLoading: Boolean = false
  preOrderingCar
  fetchedCarList
  orderingCar: CarOrdering = {}
  controlArray: any[] = []
  selectedValue: any
  selectedCarId
  show = true
  billingEndDateRange = []
  isShowList: Boolean = true
  isShowDetail: Boolean = true
  carSearchFilter = {
    carBrand: null,
    carType: null,
    carSeries: null,
    carBillingEndDateFrom: null,
    carBillingEndDateTo: null
  }

  toggleCollapse(): void {
    this.show = !this.show
  }

  resetForm(): void {
    this.carInfoSearchForm.reset()
  }
  constructor(private router: Router,
    private fb: FormBuilder,
    private generalOptionService: GeneralOptionService,
    private salesApiService: SalesApiService,
    private dialogService: DialogService,
    private passport: Passport,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(param => {
      this.orderingCar.orderingNumber = param['orderingNumber']
    })
  }

  async ngOnInit() {
    this.carInfoSearchForm = this.fb.group({
      searchCarType: [null, [Validators.required]],
      searchCarSeries: [null, [Validators.required]],
      searchCarColor: [null, [Validators.required]],
      searchCarBillingEndDateRange: [null, [Validators.required]]
    })

    this.carSelectionForm = this.fb.group({
      checkBrand: [{ value: null, disabled: true }],
      checkSeries: [{ value: null, disabled: true }],
      checkType: [{ value: null, disabled: true }],
      checkTypeCode: [{ value: null, disabled: true }],
      checkTypeCategory: [{ value: null, disabled: true }],
      checkColor: [{ value: null, disabled: true }],
      checkTransmission: [{ value: null, disabled: true }],
      checkSalesType: [{ value: null}, [Validators.required]],
      checkPaymentType: [{ value: null}, [Validators.required]],
      checkStandardSellPrice: [{ value: null}, [Validators.required, Validators.pattern(REGEXP.PRICE)]],
      checkOrderPrice: [{ value: null}, [Validators.required, Validators.pattern(REGEXP.PRICE)]],
      checkVinNumber: [{ value: null, disabled: true }],
      checkEngineNumber: [{ value: null, disabled: true }],
      checkCertificateNumber: [{ value: null, disabled: true }]
    })

    this.generalOptionService.getDropdownByCategory(DropdownCategory.Car).then(res => {
      this.carDropdownList = res.data
      this.currentBrandDropdownItem = res.data[0].CarPropertyItems.filter(item => {
        return item.Id === this.passport.getBrandId()
      })
      this.carSearchFilter.carBrand = this.currentBrandDropdownItem[0].PropertyItemCode
      this.carSeriesDropdownList = this.generalOptionService.setCarRelatedDropdown(this.carDropdownList, this.currentBrandDropdownItem, DropdownFunctionName.CarSeries)
      this.carColorDropdownList = this.generalOptionService.setCarNonRelatedDropdown(this.carDropdownList, DropdownFunctionName.CarColor)
    })
  }

  carSeriesChange(value) {
    if (value) {
      const selectedCarSeries: any = this.carSeriesDropdownList.filter((item: CarPropertyItem) => {
        return item.PropertyItemCode === value
      })
      if (selectedCarSeries.length > 0) {
        this.carTypeDropdownList = this.generalOptionService.setCarRelatedDropdown(this.carDropdownList, selectedCarSeries, DropdownFunctionName.CarType)
        this.carSearchFilter.carSeries = selectedCarSeries[0].PropertyItemText
      }
    }
  }

  carTypeChange(value) {
    if (value) {
      const selectedCarType: any = this.carTypeDropdownList.filter((item: CarPropertyItem) => {
        return item.PropertyItemCode === value
      })
      if (selectedCarType.length > 0) {
        this.carSearchFilter.carType = selectedCarType[0].PropertyItemText
      }
    }

  }

  async searchOnSaleCarList() {
    // const blob = new Blob([JSON.stringify(this.carSearchFilter)], {type: 'text/plain;charset=utf-8'})
    // FileSaver.saveAs(blob, 'carSearch.json')
    this.selectedCarId = null
    this.fetchedCarList = await this.salesApiService.fetchOnSaleCarList(this.carSearchFilter)
    this.isCarListModalVisible = true
  }

  changeBillingEndDate(result: Array<Date>) {
    if (result.length > 0) {
      this.carSearchFilter.carBillingEndDateFrom = dayjs(result[0]).valueOf()
      this.carSearchFilter.carBillingEndDateTo = dayjs(result[1]).valueOf()
    }
  }

  handleOk(): void {
    this.isConfirmLoading = true
    this.preOrderingCar = this.fetchedCarList.filter(carItem => carItem.CarId === this.selectedCarId)[0]
    setTimeout(() => {
      this.isCarListModalVisible = false
      this.isConfirmLoading = false
    }, 1000)
  }

  handleCancel(): void {
    this.isCarListModalVisible = false
  }

  submitCarSelectionForm() {
    let inValidField = 0
    // tslint:disable-next-line: forin
    for (const i in this.carSelectionForm.controls) {
      this.carSelectionForm.controls[i].markAsDirty()
      this.carSelectionForm.controls[i].updateValueAndValidity()
      if ((i === 'checkStandardSellPrice'
            || (this.orderingCar.salesType === SalesType.OrderingSale && i === 'checkOrderPrice')
            || i === 'checkPaymentType'
            || i === 'checkSalesType')
          && !this.carSelectionForm.controls[i].valid) {
        inValidField++
      }
    }
    return inValidField
  }

  reChoose() {
    this.isCarListModalVisible = true
  }

  async confirm() {
    const isFormInvalid = this.submitCarSelectionForm()
    if (isFormInvalid) {
      return
    }
    this.orderingCar.carId = this.preOrderingCar.CarId
    this.orderingCar.updatedBy = this.passport.userInfo.Username
    this.orderingCar.updatedDate = dayjs().format('YYYY-MM-DD HH:MM:ss')
    const result: any = await this.salesApiService.saveCarOrdering(this.orderingCar)
    if (result.isSuccess) {
      if (this.orderingCar.salesType === SalesType.OrderingSale) {
        this.dialogService.success('成功', '该订单已成功录入').then(res => {
          this.router.navigate(['home'])
        })
      } else {
        this.router.navigate(['sales/insuranceinfo', result.orderingNumber])
      }
    }
  }

  navigateBack() {
    this.router.navigate(['sales/customer', this.orderingCar.orderingNumber])
  }

}
