import { Pipe, PipeTransform } from '@angular/core'
import { GeneralOptionService, CarDropdownList } from 'src/app/service/common/general-option.service'
import { DropdownCategory, DropdownListPropertyCode } from '../mapping/shared'
// import * as resultDictionary from '../dorpDownDictionary.json'

@Pipe({
  name: 'generalOptionValue'
})
export class GeneralOptionValuePipe implements PipeTransform {
  constructor(
    private generalOptionService: GeneralOptionService
  ) { }
  /// targetDictionary: special parameter for the form in view mode
  /// targetForm and targetField: special parameters for the Onboarding Form and History
  transform(value: any, targetDictionary?: any, targetField?: string) {
    // let result: any = resultDictionary
    let resValue
    this.generalOptionService.resultCache[targetDictionary].forEach((generalOptionList: any) => {
      if (generalOptionList.PropertyCode === targetField) {
        for (const resItem of generalOptionList.CarPropertyItems) {
          if (resItem.PropertyItemCode === value) {
            resValue = resItem.PropertyItemText
          }
        }
      }
    })
    return resValue
  }
}



