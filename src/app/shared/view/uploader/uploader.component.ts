import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http'
import { NzMessageService } from 'ng-zorro-antd/message'
import { UploadFile } from 'ng-zorro-antd/upload'
import { filter } from 'rxjs/operators'
import { FileUploadApiService } from 'src/app/service/api/file-upload-api.service'
import { DialogService } from 'src/app/service/common/dialog.service'
import { LoadingService } from 'src/app/service/common/loading.service'

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.sass']
})
export class UploaderComponent implements OnInit {
  @Input() uploadType
  @Output() uploadStatus = new EventEmitter<boolean>()
  uploading = false
  fileList: UploadFile[] = []
  constructor(private http: HttpClient
    , private msg: NzMessageService
    , private fileUploadApiService: FileUploadApiService
    , private loadingService: LoadingService
    , private dialogService: DialogService) { }

  ngOnInit() {
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file)
    return false
  }


  async handleUpload() {
    const formData = new FormData()
    // tslint:disable-next-line:no-any
    this.fileList.forEach((file: any) => {
      formData.append('carInfoImportFile', file)
    })
    this.uploading = true
    this.loadingService.openLoading()
    console.log(formData.get('carInfoImportFile'))
    const uploadResult: any = await this.fileUploadApiService.carInfoUpload(this.uploadType, formData)
    if (uploadResult.isSuccess) {
      this.dialogService.success('上传成功', `成功导入<b>${this.fileList[0].name}</b>文件信息`).then(res => {
        this.uploading = false
        this.loadingService.closeLoading()
        this.fileList = []
      })
    } else {
      this.dialogService.error('上传失败', '文件导入失败，请重试')
      this.uploading = false
      this.loadingService.closeLoading()
    }
  }
}
