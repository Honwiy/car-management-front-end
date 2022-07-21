import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { GeneralOptionService, CarPropertyItem, CarDropdownList } from 'src/app/service/common/general-option.service'
import { DropdownCategory, DropdownFunctionName, CarPurchaseOrderingStatus } from '../../../../shared/mapping/shared'
import Passport from 'src/app/service/auth/passport'
import * as FileSaver from 'file-saver'
import { SalesApiService } from 'src/app/service/api/sales-api.service'
import { REGEXP } from 'src/app/shared/utils/regExp'
import { CarOrdering, CarInsuranceInfo, SalesService } from '../../../sales.service'
import * as dayjs from 'dayjs'
import { SalesType } from 'src/app/shared/mapping/ordering.mapping'
import { DialogService } from 'src/app/service/common/dialog.service'

@Component({
  selector: 'app-insurance-info',
  templateUrl: './insurance-info.component.html',
  styleUrls: ['./insurance-info.component.sass']
})
export class InsuranceInfoComponent implements OnInit {
  insuranceInfo: CarInsuranceInfo
  insuranceCompany: Array<Object>
  insuranceInfoForm: FormGroup
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private generalOptionService: GeneralOptionService,
    private salesApiService: SalesApiService,
    private dialogService: DialogService,
    private salesService: SalesService,
    private passport: Passport,
    private activatedRoute: ActivatedRoute
  ) {
    this.insuranceInfo = this.salesService.initCarInsuranceInfo()
    this.activatedRoute.params.subscribe(param => {
      this.insuranceInfo.orderingNumber = param['orderingNumber']
    })
  }

  ngOnInit() {
    this.initInsuranceInfoForm()
    this.generalOptionService.getDropdownByCode(DropdownFunctionName.InsuranceCompany).then(res => {
      this.insuranceCompany = res
    })
  }

  initInsuranceInfoForm() {
    this.insuranceInfoForm = this.fb.group({
      checkInsuranceCorp: [null, [Validators.required]],
      checkCustomerType: [null, [Validators.required]],
      checkAccidentIns: [null],
      checkCarDamageIns: [null],
      checkThirdPartyAmount: [null, [Validators.required]],
      checkDriverInsAmount: [null, [Validators.required]],
      checkPassengerInsAmount: [null, [Validators.required]],
      checkStolenIns: [null],
      checkGlassIns: [null],
      checkScratchIns: [null],
      checkFireIns: [null],
      checkWaterIns: [null],
      checkFindThirdPartyIns: [null],
    })
  }

  submitInsuranceInfoForm() {
    let inValidField = 0
    // tslint:disable-next-line: forin
    for (const i in this.insuranceInfoForm.controls) {
      this.insuranceInfoForm.controls[i].markAsDirty()
      this.insuranceInfoForm.controls[i].updateValueAndValidity()
      if ((i === 'checkInsuranceCorp'
        || i === 'checkCustomerType'
        || i === 'checkThirdPartyAmount'
        || i === 'checkDriverInsAmount'
        || i === 'checkPassengerInsAmount')
        && !this.insuranceInfoForm.controls[i].valid) {
        inValidField++
      }
    }
    return inValidField
  }

  backToPrev() {
    this.router.navigate(['sales/carinfo', this.insuranceInfo.orderingNumber])
  }

  async confirmToNext() {
    const isFormInvalid = this.submitInsuranceInfoForm()
    if (isFormInvalid) {
      return
    }
    const result: any = await this.salesApiService.saveInsuranceInfo(this.insuranceInfo)
    if (!result.isSuccess) {
      await this.dialogService.error('失败', '保险信息保存失败，请重试')
    } else {
      this.router.navigate(['sales/ordering', this.insuranceInfo.orderingNumber])
    }
  }
}
