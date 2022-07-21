import { GeneralOptionService } from './../../service/common/general-option.service'
import { CommonApiService } from './../../service/api/common-api.service'
import { DropdownFunctionName } from 'src/app/shared/mapping/shared'
import { SystemSettingApiService } from './../../service/api/systemsetting-api.service'
import { SearchFilter, userQueryCreteria } from './../systemsetting.service'
import { REGEXP } from './../../shared/utils/regExp'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import * as moment from 'moment'
import Passport from 'src/app/service/auth/passport'
import { DialogService } from 'src/app/service/common/dialog.service'
@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.sass']
})
export class UserPermissionComponent implements OnInit {
  userSearchForm: FormGroup
  permissionEditForm: FormGroup
  userList: any
  permissionList: any
  userPermissionList: any
  userPermissionChecked: any = []
  userName: string
  userBranch: string
  userId: number
  branchId: number
  userQueryCreteria: userQueryCreteria
  filter: SearchFilter = {}
  isShowFilter = true
  isShowList = false
  isShowPermission = false
  branchNameList: any
  searchLimitError = false
  pageIndex = 1
  pageSize = 7


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private passport: Passport,
    private systemSettingApiService: SystemSettingApiService,
    private commonApiService: CommonApiService,
    private generalOptionService: GeneralOptionService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.getBranchList()
    this.userSearchForm = this.fb.group({
      searchName: [null],
      searchPhone: [null, [Validators.pattern(REGEXP.PHONE_NUM)]],
      checkBranch: [null, [Validators.required]],
    })
  }

  async getBranchList() {
    this.branchNameList = await this.systemSettingApiService.getBranchList()
    this.branchNameList.map(item => {
      item.combineName = `${item.BrandName} - ${item.BranchName}`
    })
  }


  async searchUser() {
    let validFilterCount = 0
    let resUserList: any
    if (this.filter.Name) {
      validFilterCount++
    }
    if (this.filter.Phone) {
      validFilterCount++
    }
    if (this.filter.BranchId) {
      validFilterCount++
    }
    if (validFilterCount >= 1) {
      this.isShowList = true
      this.searchLimitError = false

      resUserList = await this.systemSettingApiService.searchUser(this.filter)
      this.userList = resUserList.userListArr

    } else {
      this.searchLimitError = true
      this.isShowList = false
    }
  }

  async editUserPermission(userId, branchId) {
    this.isShowPermission = true
    this.isShowList = false
    this.isShowFilter = false
    this.userPermissionChecked = []
    this.permissionList = await this.systemSettingApiService.getPermissionList()

    let filter = { 'userId': userId, 'branchId': branchId }
    this.userPermissionList = await this.systemSettingApiService.getUserPermissionArr(filter)
    console.log(this.permissionList)
    this.userName = this.userPermissionList[0].Username
    this.userBranch = this.userPermissionList[0].BrandName + ' - ' + this.userPermissionList[0].BranchName
    this.userId = userId
    this.branchId = branchId
    this.matchUserPermissionActionStatus(this.permissionList)
    console.log(this.userPermissionChecked)
  }

  matchUserPermissionActionStatus(permissionList: any[]) {
    permissionList.map((permissionItem) => {
      if (permissionItem.ChildArr && permissionItem.ChildArr.length === 0) {
        return
      } else {
        if (!permissionItem.hasOwnProperty('ActionObj')) {
          this.matchUserPermissionActionStatus(permissionItem.ChildArr)
        } else {
          permissionItem.ActionObj.map(actionItem => {
            this.userPermissionList.forEach((userItem, index) => {
              if (actionItem.PermissionActionId === Number(userItem.PermissionActionId)) {
                actionItem.isChecked = true
                this.userPermissionChecked.push({PermissionActionId: actionItem.PermissionActionId, IsChecked: actionItem.isChecked})
              } else {
                if (index === this.userPermissionList.length - 1 && actionItem.isChecked === false) {
                  this.userPermissionChecked.push({PermissionActionId: actionItem.PermissionActionId, IsChecked: actionItem.isChecked})
                }
              }
            })
          })
        }
      }
    })
  }

  togglePermissionActionStatus(actionObj) {
    this.userPermissionChecked.map(userPermissionCheckedItem => {
      if (userPermissionCheckedItem.PermissionActionId === actionObj.PermissionActionId) {
        userPermissionCheckedItem.IsChecked = !userPermissionCheckedItem.IsChecked
      }
    })
    console.log(this.userPermissionChecked)
  }

  async savePermission(userId,branchId) {
    
    let permissionArr: any = {}
  
    permissionArr.filter = { 'userId': userId, 'branchId': branchId }
    permissionArr.userPermissionArr = this.userPermissionChecked
    const result = await this.systemSettingApiService.saveUserPermission(permissionArr)
    console.log(permissionArr)
    if(result){
      this.dialogService.success("成功", "保存用户权限成功")
      this.isShowFilter = true
      this.isShowList = false
      this.isShowPermission = false

    }else{
      this.dialogService.error("提示", "保存失败")
    }
  }
}
