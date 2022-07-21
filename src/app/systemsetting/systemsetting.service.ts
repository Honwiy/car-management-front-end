import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SystemsettingService {

  constructor() { }

}

export interface SearchFilter {
  Name?: string
  Phone?: string
  BranchId?: number
}
export interface UserInfo {
  UserId?: string
  Username?: string
  UserEmail?: string
  UserMobile?: string
  IsActived?: number
  branchIdArr?: Array<any>
  userGroupIdArr?: Array<any>
}

export interface userQueryCreteria{
  FuncitonName?: string
}
