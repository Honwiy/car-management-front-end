import { Injectable } from '@angular/core'
import { GeneralOptionApiService } from '../api/general-option-api.service'
import { CommonApiService } from '../api/common-api.service'

@Injectable({
  providedIn: 'root'
})
export class GeneralOptionService {

  resultCache = []
  constructor(
    private generalOptionApiService: GeneralOptionApiService,
    private commonApiService: CommonApiService
  ) {

  }

  async getDropdownByCategory(category: string, code: string = null) {
    let dicResultMappingObj = { data: [] }
    if (!this.resultCache[category] || this.resultCache[category].length === 0) {
      await this.generalOptionApiService.getDropdownByCategory(category).then((d: any) => { this.resultCache[category] = d.result })
    }
    if (code) {
      let dic_data = this.resultCache[category].find(p => p.Code === code)
      if (dic_data && dic_data.Items) {
        dicResultMappingObj.data = dic_data.Items
      }
    } else {
      dicResultMappingObj.data = this.resultCache[category]
    }
    return dicResultMappingObj
  }

  async getDropdownByCode(code: string) {

    if (!this.resultCache[code] || this.resultCache[code].length === 0) {
      const queryCreteria = {
        FuncitonName: code
      }
      await this.commonApiService.getDropDownList(queryCreteria).then((res: any) => { this.resultCache[code] = res })
    }
    return this.resultCache[code]
  }

  setCarRelatedDropdown(carDropdownList: Array<CarDropdownList>, selectedParentItem: CarPropertyItem, dropdownType: string) {
    if (selectedParentItem !== undefined) {
      let result = new Array<object>()
      for (const carDropdownSubList of carDropdownList) {
        if (carDropdownSubList.PropertyCode === dropdownType) {
          result = carDropdownSubList.CarPropertyItems.filter(item => item.ParentId === selectedParentItem[0].Id)
        }
      }
      return result
    }
    return []
  }

  setCarNonRelatedDropdown(carDropdownList: Array<CarDropdownList>, dropdownType: string) {
    if (carDropdownList !== undefined) {
      let result = new Array<object>()
      for (const generalOption of carDropdownList) {
        if (generalOption.PropertyCode === dropdownType) {
          result = generalOption.CarPropertyItems
        }
      }
      return result
    }
    return []
  }
}


export interface GeneralOption {
  Id?: number
  BrandId?: number
  FuncitonName?: string
  Name?: string
  PermissionId?: number
  isActive?: number
  Category?: string
  ParentId?: number
  Code?: string
  SubName?: string
}

export interface CarDropdownList {
  Id?: number
  PropertyCode?: string,
  PropertyText?: string,
  FuncitonName?: string,
  isActive?: number,
  CreatedDate?: string,
  CreatedBy?: string,
  UpdatedDate?: string,
  UpdatedBy?: string,
  CarPropertyItems?: Array<CarPropertyItem>
}

export interface CarPropertyItem {
  Id?: number,
  PropertyId?: number,
  PropertyItemCode?: string,
  PropertyItemText?: string,
  FuncitonName?: string,
  isActive?: number,
  ParentId?: number,
  CreatedDate?: string,
  CreatedBy?: string,
  UpdatedDate?: string,
  UpdatedBy?: string
}
