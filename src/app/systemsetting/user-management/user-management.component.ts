import { GeneralOptionService } from './../../service/common/general-option.service'
import { CommonApiService } from './../../service/api/common-api.service'
import { DropdownFunctionName } from 'src/app/shared/mapping/shared'
import { SystemSettingApiService } from './../../service/api/systemsetting-api.service'
import { SearchFilter, userQueryCreteria, UserInfo } from './../systemsetting.service'
import { REGEXP } from './../../shared/utils/regExp'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import * as moment from 'moment'
import Passport from 'src/app/service/auth/passport'
import { DialogService } from 'src/app/service/common/dialog.service'
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal'

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.sass']
})
export class UserManagementComponent implements OnInit {
  userSearchForm: FormGroup
  permissionEditForm: FormGroup
  userList: any
  permissionList: any
  userInfo: UserInfo = {}
  userName: string
  userBranch: string
  userId: number
  userQueryCreteria: userQueryCreteria
  filter: SearchFilter = {}
  isShowFilter = true
  isShowList = false
  isShowUserInfo = false
  branchNameList: any
  usergroupList: any
  searchLimitError = false
  pageIndex = 1
  pageSize = 7
  validateForm: FormGroup
  isShowDelete = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private passport: Passport,
    private systemSettingApiService: SystemSettingApiService,
    private commonApiService: CommonApiService,
    private generalOptionService: GeneralOptionService,
    private dialogService: DialogService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.getBranchList()
    this.getUsergroupList()
    this.userSearchForm = this.fb.group({
      searchName: [null],
      searchPhone: [null, [Validators.pattern(REGEXP.PHONE_NUM)]],
      checkBranch: [null, [Validators.required]],
    })
    this.validateForm = this.fb.group({
      checkUserName: [null, [Validators.required]],
      checkPhone: [null, [Validators.required, Validators.pattern(REGEXP.PHONE_NUM)]],
      checkMail: [null, [Validators.required, Validators.pattern(REGEXP.MAIL)]],
      checkBranch: [null, [Validators.required]],
      checkUserGroup: [null, [Validators.required]],
    })
  }

  async getBranchList() {
    this.branchNameList = await this.systemSettingApiService.getBranchList()
    this.branchNameList.map(item => {
      item.combineName = `${item.BrandName} - ${item.BranchName}`
    })
    console.log(this.branchNameList)
  }

  async getUsergroupList() {
    this.usergroupList = await this.systemSettingApiService.getUsergroupList()
    console.log(this.usergroupList)
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

  async editUser(userId) {
    this.isShowUserInfo = true
    this.isShowList = false
    this.isShowDelete = true
    this.userInfo = await this.systemSettingApiService.getUserInfo(userId)
    this.userId = userId
    console.log(this.userInfo)

  }

  async saveUser() {
    console.log(this.userInfo)
    // this.userInfo.IsActived = 1
    const result = await this.systemSettingApiService.saveUserInfo(this.userInfo)

    if (result) {
      this.dialogService.success('成功', '保存用户信息成功')
      this.isShowFilter = true
      this.isShowList = false
      this.isShowUserInfo = true
    } else {
      this.dialogService.error('提示', '保存失败')
    }
  }

  async createUser() {
    this.isShowUserInfo = true
    this.userInfo = {}
    this.isShowDelete = false
  }

  async deleteUser() {
    this.modalService.create({
      nzTitle: '提示',
      nzContent: '确定要删除此员工？',
      nzClosable: false,
      nzOnOk: () => this.deleteUserInfo()
    })
  }

  async deleteUserInfo() {
    console.log(this.userId)
    this.userInfo.IsActived = 0
    const result = await this.systemSettingApiService.saveUserInfo(this.userInfo)
    if (result) {
      this.dialogService.success('成功', '删除用户信息成功')
      this.isShowFilter = true
      this.isShowList = false
      this.isShowUserInfo = false
    } else {
      this.dialogService.error('提示', '删除失败')
    }
  }
}
