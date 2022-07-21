import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { GeneralOptionService } from '../common/general-option.service'
import { DropdownCategory } from 'src/app/shared/mapping/shared'

@Injectable()
export class GeneralOptionResolver implements Resolve<any> {
  constructor(
    private generalOptionService: GeneralOptionService
  ) {}
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return [this.generalOptionService.getDropdownByCategory(DropdownCategory.Car)]
  }
}
