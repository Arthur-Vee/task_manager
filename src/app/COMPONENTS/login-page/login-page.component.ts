import { Component, Inject, PLATFORM_ID } from '@angular/core'
import { MaterialModule } from '../../material.module'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule, isPlatformServer } from '@angular/common'
import { UsersService } from '../../service/users/users.service'
import { take } from 'rxjs'
import { Router, RouterLink } from '@angular/router'

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  loginForm: FormGroup | null = null

  isServer: boolean | null = null

  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router, @Inject(PLATFORM_ID) platformId: Object) {
    this.isServer = isPlatformServer(platformId)

    this.loginForm = this.fb.group({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    })
  }

  signIn(): void {
    this.userService.signInUser(this.loginForm?.value).pipe(take(1)
    ).subscribe({
      next: () => {
        this.loginForm?.setErrors(null)
        this.router.navigate(['/tasks-list'])
      },
      error: () => {
        this.loginForm?.setErrors({ unauthorised: true })
      }
    })
  }


}

