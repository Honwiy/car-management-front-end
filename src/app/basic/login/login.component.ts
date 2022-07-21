import { DialogService } from '../../service/common/dialog.service'
import { UserLoginDto, UserDto } from './../user.service'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { UserApiService } from '../../service/api/user-api.service'
import { UserService } from '../../basic/user.service'
import { AuthService } from 'src/app/service/auth/auth.service'
import Passport from 'src/app/service/auth/passport'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {

  constructor(
    private userApiService: UserApiService,
    private userService: UserService,
    private passport: Passport,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  loginInfo: UserLoginDto

  validateForm: FormGroup

  ngOnInit(): void {
    this.loginInfo = this.userService.loginInformation()
    this.loginInfo.Email = 'yu444217547@gmail.com'
    this.loginInfo.Password = 'yu1452321'
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    })
  }

  async submitForm(loginData) {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty()
      this.validateForm.controls[i].updateValueAndValidity()
    }
    if (this.validateForm.valid) {
      const result: any = await this.userApiService.userLogin(loginData)
      if (result) {
        this.auth.passport.saveLocal(result.token)
        this.passport.setOrganizations(this.auth.passport.organizations)
        this.passport.setCurrentBrandName(this.auth.passport.organizations[0].label)
        this.passport.setCurrentBranchName(this.auth.passport.organizations[0].children[0].label)
        this.auth.isLoggedIn = true
        this.router.navigate(['home'])
      }
    }
  }

}
