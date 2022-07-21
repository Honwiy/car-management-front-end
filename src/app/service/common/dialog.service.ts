import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal'

export class DialogService {
  constructor(private modalService: NzModalService) { }

  info(title, message) {
    this.modalService.create({
      nzTitle: title,
      nzContent: message,
      nzClosable: false,
      nzOnOk: () => {
        return true
      }
    })
  }

  async success(title, message): Promise<any> {
    return this.modalService.success({
      nzTitle: title,
      nzContent: message
    })
  }

  error(title, message) {
    return this.modalService.error({
      nzTitle: title,
      nzContent: message
    })
  }

  warning(title, message) {
    return this.modalService.warning({
      nzTitle: title,
      nzContent: message
    })
  }

  async confirm(title, content) {
    return new Promise<boolean>((resolve, reject) => {
      const modal: NzModalRef = this.modalService.create({
        nzTitle: title,
        nzContent: content,
        nzFooter: [
          {
            label: '取消',
            shape: 'default',
            onClick: () => modal.destroy()
          },
          {
            label: '确认',
            type: 'primary',
            onClick: () => {
              resolve(true)
              modal.destroy()
            }
          }
        ]
      })
    })
  }
}
