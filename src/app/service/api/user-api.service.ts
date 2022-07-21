import { UserDto, UserLoginDto } from '../../basic/user.service'
import { Injectable } from '@angular/core'
import { HttpService } from './http.service'

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  baseUrl = `http://localhost:3000/api`
  constructor(
    private http: HttpService
  ) { }

  public userLogin(user: UserLoginDto) {
    const url = `${this.baseUrl}/users/login`
    const data = { user }
    return this.http.PostPromise(url, data)
  }
}
