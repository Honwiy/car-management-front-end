import { UserDto, UserLoginDto } from '../../basic/user.service'
import { Injectable } from '@angular/core'
import { HttpService } from './http.service'

@Injectable({
  providedIn: 'root'
})
export class SystemSettingApiService {
  baseUrl = `http://localhost:3000/api`
  constructor(
    private http: HttpService
  ) { }

  public searchUser(filter) {
    const url = `${this.baseUrl}/permission/searchUser`
    const filterConst = { filter }
    // console.log(filterConst)
    return this.http.PostPromise(url, filterConst)
  }

  public getBranchList() {
    const url = `${this.baseUrl}/permission/getBranchList`
    return this.http.GetPromise(url)
  }

  public getUsergroupList(){
    const url = `${this.baseUrl}/permission/getUsergroupList`
    return this.http.GetPromise(url)
  }

  public getPermissionList(){
    const url = `${this.baseUrl}/permission/getPermissionSectionArr`
    return this.http.GetPromise(url)
  }

  public getUserPermissionArr(filter) {
    const url = `${this.baseUrl}/permission/getUserPermissionArr`
    const filterConst = { filter }
    // console.log(filterConst)
    return this.http.PostPromise(url, filterConst)
  }

  public saveUserPermission(permissionArr) {
    const url = `${this.baseUrl}/permission/saveUserPermission`
    const filterConst = { permissionArr }
    // console.log(filterConst)
    return this.http.PostPromise(url, filterConst)
  }

  public getUserInfo(userId) {
    const url = `${this.baseUrl}/permission/getUserInfo`
    const filterConst = { userId }
    return this.http.PostPromise(url, filterConst)
  }

  public saveUserInfo(userArr) {
    const url = `${this.baseUrl}/permission/saveUserInfo`
    const filterConst = { userArr }
    return this.http.PostPromise(url, filterConst)
  }

}
