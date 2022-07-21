import { Component, OnInit } from '@angular/core'
import { GeneralOptionService, CarDropdownList } from 'src/app/service/common/general-option.service'
import { DropdownCategory } from '../../../shared/mapping/shared'

// Temp
interface ItemData {
  id: number
  name: string
  age: number
  address: string
}

@Component({
  selector: 'app-car-information-management',
  templateUrl: './car-information-management.component.html',
  styleUrls: ['./car-information-management.component.sass']
})
export class CarInformationManagementComponent implements OnInit {

  // Temp
  isAllDisplayDataChecked = false
  isIndeterminate = false
  listOfDisplayData: ItemData[] = []
  listOfAllData: ItemData[] = []
  mapOfCheckedId: { [key: string]: boolean } = {}

  carDropdownList: Array<CarDropdownList>
  constructor(
    private generalOptionService: GeneralOptionService
  ) { }

  async ngOnInit() {
    const result = await this.generalOptionService.getDropdownByCategory(DropdownCategory.Car)
    this.carDropdownList = result.data

    for (let i = 0; i < 100; i++) {
      this.listOfAllData.push({
        id: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`
      })
    }

  }

  currentPageDataChange($event: ItemData[]): void {
    this.listOfDisplayData = $event
    console.log(this.listOfDisplayData)
    this.refreshStatus()
  }

  toggleCarInfoItem(): void {
    this.refreshStatus()
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id])
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id] = value))
    this.refreshStatus()
  }

}
