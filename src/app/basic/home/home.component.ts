import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { UserService } from '../user.service'
import { MenuType, DropdownCategory } from '../../shared/mapping/shared'
import { WebSocketService } from 'src/app/service/common/websocket.service'
import { GeneralOptionService } from 'src/app/service/common/general-option.service'
import { CascaderOption } from 'ng-zorro-antd/cascader'
import Passport from 'src/app/service/auth/passport'
import { DialogService } from 'src/app/service/common/dialog.service'
import * as dayjs from 'dayjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  openMap: { [name: string]: boolean } = {
    sales: false,
    afterSales: false,
    derivative: false,
    finance: false,
    administrator: false,
    storeHouse: false,
    systemSetting: false,
  }

  notificationList: any
  branchSelection: any
  isHiddenBrandSelectionTool: boolean
  values: string[]
  branchOptions: CascaderOption[]

  constructor(
    private router: Router,
    private passport: Passport,
    private userService: UserService,
    private websocketService: WebSocketService,
    private generalOptionService: GeneralOptionService,
    private dialogService: DialogService,
    private activeRouter: ActivatedRoute
  ) {
  }

  async ngOnInit() {
    this.branchOptions = this.passport.getOrganizations()
    this.values = [this.passport.getCurrentBrandName(), this.passport.getCurrentBranchName()]
    this.isHiddenBrandSelectionTool = this.activeRouter.snapshot['_routerState'].url !== '/home' ? true : false
    // TODO: Websocket to access notification list
    this.notificationList = this.websocketService.sendSocketMessage('111')
  }

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false
      }
    }
  }

  onChangeSelectedBranch(values: string[]): void {
    values.forEach((value, index) => {
      switch (index) {
        case 0:
          this.passport.setCurrentBrandName(value)
          break
        case 1:
          this.passport.setCurrentBranchName(value)
          break
        default:
          break
      }
    })
  }

  async logout() {
    this.passport.removeLocal()
    this.dialogService.success('成功', '成功登出系统')

    this.router.navigate(['login'])

  }

  navigateTo(type: string) {
    if (type !== MenuType.Home) {
      if (!this.passport.getCurrentBranchName() || !this.passport.getCurrentBrandName) {
        this.dialogService.info('警告', '请选择品牌/门店信息后，跳转至业务界面')
        return
      }
    }
    switch (type) {
      // 主页
      case MenuType.Home:
        this.router.navigate(['home'])
        break
      /** 销售部分 */
      // 订车
      case MenuType.CarPurchase:
        this.router.navigate(['sales/ordering'])
        break
      // 客户
      case MenuType.Customer:
        this.router.navigate(['sales/customer/0'])
        break
      /** 采购部分 */
      // 车辆采购
      case MenuType.CarPurchaseOrdering:
        this.router.navigate(['store-house/carPurchaseOrdering'])
        break
      // 采购审批
      case MenuType.PurchasingApproval:
        this.router.navigate(['financial/purchasingApproval'])
        break
      /** 精品部分 */
      // 精品管理
      case MenuType.AdvancedManagement:
        this.router.navigate(['derivative/management'])
        break
      // 精品销售
      case MenuType.AdvancedProductSales:
        this.router.navigate(['derivative/advancedProductSales'])
        break
      /** 商品入库 */
      // 车辆入库
      case MenuType.CarInformationImport:
        this.router.navigate(['store-house/carInformationImport'])
        break
      /** 系统设置 */
      // 用户权限
      case MenuType.UserPermission:
        this.router.navigate(['systemsetting/user-permission'])
        break
      // 用户管理
      case MenuType.UserManagement:
        this.router.navigate(['systemsetting/userManagement'])
        break
      // 客户信息管理
      case MenuType.CustomerManagement:
        this.router.navigate(['data-management/customerManagement'])
        break
      // 车辆基础信息管理
      case MenuType.CarBasicInformationManagement:
        this.router.navigate(['data-management/carInformationManagement'])
        break
      // 基础售价管理
      case MenuType.CarSellingPriceManagement:
        this.router.navigate(['data-management/carSellingPriceManagement'])
        break
      /** 用户信息 */
      // 个人信息
      case MenuType.PersonalInformation:
        this.router.navigate(['user-management/personalInformation'])
        break
      default:
        break
    }
  }
}
