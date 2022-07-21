import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms'
import { Observable, Observer } from 'rxjs'
@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.sass']
})
export class PersonalInformationComponent implements OnInit {
  validateForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      userName: [{value: '', disabled: true}],
      email: [{value: '', disabled: true }],
      password: ['', [Validators.required]],
      comment: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  submitForm(value: { userName: string; email: string; password: string; confirm: string; comment: string }): any {
    let inValidField = 0
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty()
      this.validateForm.controls[i].updateValueAndValidity()
      console.log(i, this.validateForm.controls[i].valid, this.validateForm.get(i).errors)
      if (!this.validateForm.controls[i].valid) {
        inValidField++
      }
    }
    console.log(inValidField)

    return inValidField
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity())
  }

}
