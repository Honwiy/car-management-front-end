import { UserManagementComponent } from './user-management/user-management.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPermissionComponent } from './user-permission/user-permission.component';
import { HomeComponent } from '../basic/home/home.component';
import { SharedModule } from '../shared/shared.module';

export const routes: Routes = [
{
  path: 'systemsetting',
  component: HomeComponent,
  children: [
    {
      path: 'user-permission',
      component: UserPermissionComponent,
    },
    {
      path: 'personalInformation',
      component: PersonalInformationComponent
    },
    {
      path: 'userManagement',
      component: UserManagementComponent
    }
  ]
}
]

@NgModule({
  declarations: [
    UserPermissionComponent,
    PersonalInformationComponent,
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload'})
  ]
})
export class SystemsettingModule { }
