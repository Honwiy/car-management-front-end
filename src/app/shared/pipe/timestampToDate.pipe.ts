import { Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import * as dayjs from 'dayjs'

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }

  transform(value) {
    
    return value !== null ? dayjs(Number(value)).format('YYYY-MM-DD') : ' -- '
  }
}
