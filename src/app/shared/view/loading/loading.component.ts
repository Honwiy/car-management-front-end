import { Component, OnInit } from '@angular/core'
import { LoadingService } from 'src/app/service/common/loading.service'

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass']
})
export class LoadingComponent implements OnInit {
  get isDisable(): boolean  {
    return this.loadingService.isDisable
  }
  constructor(
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
  }

}
