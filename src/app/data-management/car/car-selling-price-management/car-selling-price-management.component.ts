import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { GeneralOptionService, CarPropertyItem, CarDropdownList } from 'src/app/service/common/general-option.service'
import { DropdownCategory, DropdownFunctionName, CarPurchaseOrderingStatus } from '../../../shared/mapping/shared'
import Passport from 'src/app/service/auth/passport'
// import * as FileSaver from 'file-saver'
import { ManagementApiSerbice } from 'src/app/service/api/management-api.service'
import { NzModalService } from 'ng-zorro-antd'

@Component({
  selector: 'app-car-selling-price-management',
  templateUrl: './car-selling-price-management.component.html',
  styleUrls: ['./car-selling-price-management.component.sass']
})
export class CarSellingPriceManagementComponent implements OnInit {
  value: string
  carInfoSearchForm: FormGroup
  carDropdownList: Array<CarDropdownList>
  carBrandDropdownList: Array<any> = []
  carSeriesDropdownList: Array<Object>
  carTypeDropdownList: Array<Object>

  controlArray: any[] = []
  selectedValue: any
  radioValue = 'A'
  show = true
  isShowList: Boolean = true
  isShowDetail: Boolean = true
  searchLimitedError: boolean
  carSearchFilter = {
    carBrand: null,
    carType: null,
    carSeries: null
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
    private managementApiService: ManagementApiSerbice,
    private modalService: NzModalService,
    private passport: Passport
  ) { }

  async ngOnInit() {
    this.carInfoSearchForm = this.fb.group({
      searchCarType: [null, [Validators.required]],
      searchCarSeries: [null, [Validators.required]],
      searchCarBrand: [null, [Validators.required]]
    })
    this.generalOptionService.getDropdownByCategory(DropdownCategory.Car).then(res => {
      this.carDropdownList = res.data
      for (const carBrandItem of res.data[0].CarPropertyItems) {
        for (const organizationItem of this.passport.organizations) {
          if (carBrandItem.PropertyItemCode === organizationItem.value) {
            this.carBrandDropdownList.push(carBrandItem)
          }
        }
      }
    })
  }

  carBrandChange(value: any) {
    if (value) {
      this.carSearchFilter.carSeries = undefined
      this.carSearchFilter.carType = undefined
      const selectedBrand: any = this.carBrandDropdownList.filter((item: CarPropertyItem) => {
        return item.PropertyItemCode === value
      })
      if (selectedBrand.length > 0) {
        this.carSeriesDropdownList = this.generalOptionService.setCarRelatedDropdown(this.carDropdownList, selectedBrand, DropdownFunctionName.CarSeries)
        this.carSearchFilter.carBrand = selectedBrand[0].PropertyItemCode
      }
    }
  }

  carSeriesChange(value) {
    if (value) {
      this.carSearchFilter.carType = undefined
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

  submitSearchForm() {
    let inValidField = 0
    this.searchLimitedError = false
    // tslint:disable-next-line: forin
    for (const i in this.carInfoSearchForm.controls) {
      this.carInfoSearchForm.controls[i].markAsDirty()
      this.carInfoSearchForm.controls[i].updateValueAndValidity()
      if (!this.carInfoSearchForm.controls[i].valid) {
        inValidField++
      }
    }
    return inValidField
  }

  async searchOnSaleCarList() {
    // const blob = new Blob([JSON.stringify(this.carSearchFilter)], {type: 'text/plain;charset=utf-8'})
    // FileSaver.saveAs(blob, 'carSearch.json')
    const invalidNum = this.submitSearchForm()
    if (invalidNum > 0) {
      this.searchLimitedError = true
      return
    }
    const result: any = await this.managementApiService.fetchCarSellingPriceMapping(this.carSearchFilter)
    if (result.length === 0) {
      this.modalService.info({
        nzTitle: '提示',
        nzContent: '无法找到该车型基准售价，是否新建车型基准收假',
        nzCancelText: '取消',
        nzOnOk: () => console.log('Info OK')
      })
    } else {

    }
  }

  navigateTo(path) {
    this.router.navigate(['sales/ordering'])
  }

}
