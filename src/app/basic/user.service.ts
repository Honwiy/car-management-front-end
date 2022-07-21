import { Injectable } from '@angular/core'
import Passport from '../service/auth/passport'

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(
    private passport: Passport
  ) { }

  public loginInformation(): UserLoginDto {
    return {
      Email: '',
      Password: ''
    }
  }

}

export interface UserDto {
  Username?: string,
  Email?: string,
  Password?: string,
  BrandId?: string,
  RoleId?: string,
  IsActived?: string
}

export interface UserLoginDto {
  Email?: string,
  Password?: string
}
