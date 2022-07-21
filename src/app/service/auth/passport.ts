import * as decode from 'jwt-decode'
import * as moment from 'moment'
import { environment } from '../../../environments/environment'
import { AuthService } from './auth.service'
import { UserService } from 'src/app/basic/user.service'
const CONSTANTS = {
  EXPIRES_IN: 'exp',
  ID_TOKEN: 'id_token',
  UserInfo: 'userInfo',
  Organizations: 'organizations',
  UserGroup: 'userGroup',
  ISSUE_AT: 'iat',
  // STATE: 'state',
  // ENV: 'env'
  // Username, Email, UserRole, UserBrand, exp, iat
}

export default class Passport {
  id_token?
  expires_in: number
  userInfo: any
  organizations: any
  userGroup: any


  currentBrand: string
  currentBranch: string
  organization: any

  constructor(
  ) {
    const id_token = localStorage.getItem(CONSTANTS.ID_TOKEN)
    const userinfo = localStorage.getItem(CONSTANTS.UserInfo)
    const usergroup = localStorage.getItem(CONSTANTS.UserGroup)
    const storageOrganizations = localStorage.getItem(CONSTANTS.Organizations)

    if (id_token) {
      this.id_token = id_token
      this.expires_in = Number(localStorage.getItem(CONSTANTS.EXPIRES_IN))
      this.userInfo = JSON.parse(userinfo)
      this.userGroup = JSON.parse(usergroup)
      this.organizations = JSON.parse(storageOrganizations)
      this.currentBrand = this.organizations[0].label
      this.currentBranch = this.organizations[0].children[0].label
    }
  }


  setOrganizations(organization) {
    this.organization = organization
  }

  getOrganizations() {
    return this.organization
  }

  setCurrentBrandName(brand) {
    this.currentBrand = brand
  }

  getCurrentBrandName() {
    return this.currentBrand
  }

  setCurrentBranchName(branch) {
    this.currentBranch = branch
  }

  getCurrentBranchName() {
    return this.currentBranch
  }

  getBrandId() {
    return JSON.parse(localStorage.getItem(CONSTANTS.UserGroup)).filter(item => item.BrandText === this.currentBrand)[0].BrandId
  }

  public decodeToken(id_token) {
    const { id, Username, Email, Mobile, Organizations, UserGroup, exp, iat } = decode(id_token)
    return { id, Username, Email, Mobile, Organizations, UserGroup, exp, iat }
  }

  public saveLocal(id_token) {
    this.id_token = id_token
    const { id, Username, Email, Mobile, Organizations, UserGroup, exp, iat } = this.decodeToken(id_token)
    this.expires_in = exp
    const userInfo: any = { id, Username, Email, Mobile }
    this.userInfo = userInfo
    this.organizations = Organizations
    this.userGroup = UserGroup
    localStorage.setItem(CONSTANTS.ID_TOKEN, id_token)
    localStorage.setItem(CONSTANTS.UserInfo, JSON.stringify(this.userInfo))
    localStorage.setItem(CONSTANTS.Organizations, JSON.stringify(this.organizations))
    localStorage.setItem(CONSTANTS.UserGroup, JSON.stringify(this.userGroup))
    localStorage.setItem(CONSTANTS.EXPIRES_IN, (this.expires_in + 7 * 60 * 60).toString())
  }

  public removeLocal() {
    this.id_token = null
    this.userInfo = null
    this.organizations = []
    this.userGroup = []
    this.expires_in = null
    localStorage.removeItem(CONSTANTS.ID_TOKEN)
    localStorage.removeItem(CONSTANTS.EXPIRES_IN)
    localStorage.removeItem(CONSTANTS.UserInfo)
    localStorage.removeItem(CONSTANTS.Organizations)
    localStorage.removeItem(CONSTANTS.UserGroup)
  }

  public refreshToken(id_token: string) {
    localStorage.setItem(CONSTANTS.ID_TOKEN, id_token)
  }

  public tokenExpired(): boolean {

    const now = moment().utc().unix() // current timestamp

    if (!environment.production) {
      this.expires_in = this.expires_in + 12 * 30 * 24 * 60 * 60
    }

    if (this.expires_in > now) {
      return false
    }
    else {
      this.removeLocal()
      return true
    }
  }
}
