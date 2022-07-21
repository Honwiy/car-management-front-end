import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { SalesService, Present, CustomerOrder, PaySubject, CarOrdering } from '../../../sales.service'
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb'
import { ActivatedRoute, Router } from '@angular/router'
import { REGEXP } from 'src/app/shared/utils/regExp'
import { SalesApiService } from 'src/app/service/api/sales-api.service'
import { GeneralOptionService } from 'src/app/service/common/general-option.service'
import { DropdownFunctionName } from 'src/app/shared/mapping/shared'

enum CAR_SALE_TYPE {
  ORDERINGSALE = 'orderingSale',
  WHOLESALE = 'wholeSale',
}

@Component({
  selector: 'app-ordering',
  templateUrl: './ordering.component.html',
  styleUrls: ['./ordering.component.sass']
})

export class OrderingComponent implements OnInit {
  value: string
  priceListForm: FormGroup
  paidWayList: any[] = []
  orderingNumber: number
  controlArray: any[] = []
  show = false
  presentList: Array<Present> = []
  // orderObj: CustomerOrder
  selectedValue: string
  orderingCar: CarOrdering = {}
  toggleCollapse(): void {
    this.show = !this.show
  }

  // tslint:disable-next-line: member-ordering
  presentNameList: any[] = [
    { Code: '1', Name: '精品1' },
    { Code: '2', Name: '精品2' },
    { Code: '3', Name: '精品3' },
  ]
  // tslint:disable-next-line: member-ordering
  isFreeOption: any[] = [
    { Code: '1', Name: '赠送' },
    { Code: '0', Name: '购买' }
  ]

  constructor(
    private fb: FormBuilder,
    private salesService: SalesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private salesApiService: SalesApiService,
    private generalOptisonService: GeneralOptionService
  ) {
    this.orderingPriceForm()
    // this.orderObj = this.salesService.createCarOrderPrice()
    this.activatedRoute.params.subscribe(param => {
      this.orderingNumber = param['orderingNumber']
    })
  }


  async ngOnInit() {
    this.paidWayList = await this.generalOptisonService.getDropdownByCode(DropdownFunctionName.CustomerPayment)
    this.orderingCar = await this.salesApiService.fetchCarByOrderingNumber(this.orderingNumber)
    console.log(this.orderingCar)
    this.presentList.push(this.salesService.createPresent())

  }

  orderingPriceForm() {
    this.priceListForm = this.fb.group({
      orderPrice: [{ value: null}, [Validators.required, Validators.pattern(REGEXP.ID_CARD)]],
      orderPaidWay: [{ value: null}, [Validators.required]],
      orderPriceComment: [{ value: null}, [Validators.required]],

      firstPaid: [{ value: null}, [Validators.required, Validators.pattern(REGEXP.PHONE_NUM)]],
      firstPaidWay: [{ value: null}, [Validators.required]],
      firstPaidComment: [{ value: null}, [Validators.required]],

      carPrice: [{ value: null}, [Validators.required, Validators.pattern(REGEXP.PHONE_NUM)]],
      carPricePaidWay: [{ value: null}, [Validators.required]],
      carPriceComment: [{ value: null}, [Validators.required]],

      arrearPaidPrice: [{ value: null}, [Validators.required, Validators.pattern(REGEXP.PHONE_NUM)]],
      arrearPaidWay: [{ value: null}, [Validators.required]],
      arrearPaidPriceComment: [{ value: null}, [Validators.required]],

      serviceCharge: [{ value: null}, [Validators.required, Validators.pattern(REGEXP.PHONE_NUM)]],
      serviceChargePaidWay: [{ value: null}, [Validators.required]],
      serviceChargeComment: [{ value: null}, [Validators.required]],

      derivativePrice: [{ value: null}, [Validators.required, Validators.pattern(REGEXP.PHONE_NUM)]],
      derivativePaidWay: [{ value: null}, [Validators.required]],
      derivativePriceComment: [{ value: null}, [Validators.required]],

      agentLicensePrice: [{ value: null}, [Validators.required, Validators.pattern(REGEXP.PHONE_NUM)]],
      agentLicensePaidWay: [{ value: null}, [Validators.required]],
      agentLicensePriceComment: [{ value: null}, [Validators.required]],

      agentTaxPrice: [{ value: null}, [Validators.required, Validators.pattern(REGEXP.PHONE_NUM)]],
      agentTaxPaidWay: [{ value: null}, [Validators.required]],
      agentTaxPriceComment: [{ value: null}, [Validators.required]],

      agentGreenBookPrice: [{ value: null}, [Validators.required, Validators.pattern(REGEXP.PHONE_NUM)]],
      agentGreenBookPaidWay: [{ value: null}, [Validators.required]],
      agentGreenBookPriceComment: [{ value: null}, [Validators.required]],

      greenBookDeposit: [{ value: null}, [Validators.required, Validators.pattern(REGEXP.PHONE_NUM)]],
      greenBookDepositPaidWay: [{ value: null}, [Validators.required]],
      greenBookDepositComment: [{ value: null}, [Validators.required]],

      checkStandardSellPrice: [{ value: null }, [Validators.required, Validators.pattern(REGEXP.PRICE)]],
      checkVinNumber: [{ value: null}, [Validators.required]],
      checkEngineNumber: [{ value: null}, [Validators.required]],
      checkCertificateNumber: [{ value: null}, [Validators.required]]
    })
  }

  addField() {
    this.presentList.push(this.salesService.createPresent())
    console.log(this.presentList)

  }

  resetForm(): void {
    this.priceListForm.reset()

  }

  removeField(i) {
    this.presentList = this.presentList.filter((item, index) => {
      return index !== i
    })
  }

  navigateBack(subRoute) {
    this.router.navigate([`sales/${subRoute}`, this.orderingNumber])
  }

}
