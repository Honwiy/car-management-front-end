import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { ResInterceptor } from '../service/auth/res.interceptor'
import { AuthInterceptor } from '../service/auth/auth.interceptor'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzRadioModule } from 'ng-zorro-antd/radio'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NgZorroAntdModule } from 'ng-zorro-antd'
import { registerLocaleData } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzCascaderModule } from 'ng-zorro-antd/cascader'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { SafeHtmlPipe } from '../shared/pipe/safe-html.pipe'
import { GeneralOptionValuePipe } from '../shared/pipe/general-option.pipe'
import { TimestampToDatePipe } from '../shared/pipe/timestampToDate.pipe'
import { UploaderComponent } from './view/uploader/uploader.component'
import { LoadingComponent } from './view/loading/loading.component'
import { NzTableModule } from 'ng-zorro-antd/table'


@NgModule({
  declarations: [
    SafeHtmlPipe
  , GeneralOptionValuePipe
  , TimestampToDatePipe
  , UploaderComponent
  , LoadingComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NzButtonModule,
    NgZorroAntdModule,
    NzRadioModule,
    NzCardModule,
    NzFormModule,
    NzTabsModule,
    NzSpinModule,
    NzDropDownModule,
    NzDatePickerModule,
    NzSelectModule,
    NzCheckboxModule,
    NzTableModule,
    SafeHtmlPipe,
    GeneralOptionValuePipe,
    TimestampToDatePipe,
    UploaderComponent,
    LoadingComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ResInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class SharedModule { }
