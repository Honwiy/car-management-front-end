import { Component, OnInit } from '@angular/core'
import { PurchaseOrderingService } from '../../../service/common/purchase-ordering.service'

@Component({
  selector: 'app-purchasing-approval',
  templateUrl: './purchasing-approval.component.html',
  styleUrls: ['./purchasing-approval.component.sass']
})
export class PurchasingApprovalComponent implements OnInit {

  ApprovalTypeList = [
    {
      Code: 'CarApproval',
      Text: '车辆采购审批'
    },
    {
      Code: 'AfterSalesApproval',
      Text: '售后配件采购审批'
    },
    {
      Code: 'DerivativeApprove',
      Text: '精品采购审批'
    }
  ]

  constructor(
    private carPurchaseOrderingService: PurchaseOrderingService
  ) { }

  ngOnInit() {
  }

}
