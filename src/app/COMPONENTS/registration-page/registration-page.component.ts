import { Component } from '@angular/core'
import { MaterialModule } from '../../material.module'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { UserRegistration } from '../../models/user.model'
import { UsersService } from '../../service/users/users.service'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {
  registrationForm: FormGroup = this.fb.group({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
  })

  constructor(private fb: FormBuilder, private usersService: UsersService) { }

  registerUser(userData: UserRegistration) {
    if (this.registrationForm?.valid) {
      this.usersService.registerUser(userData)
    }
  }
}
