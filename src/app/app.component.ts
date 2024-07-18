import { Component } from '@angular/core'
import { RouterOutlet, RouterLink, Router } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { TaskComponent } from './components/task/task.component'
import { MaterialModule } from './material.module'
import { CommonModule } from '@angular/common'
import { LoginPageComponent } from './components/login-page/login-page.component'
import { UsersService } from './service/users/users.service'
import { Observable} from 'rxjs'
import { User } from './models/user.model'






@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule,
    TaskComponent,
    MaterialModule,
    CommonModule,
    LoginPageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'Task Manager'

  isLoggedIn$: Observable<String | null> = this.usersService.isLoggedIn$
  user$: Observable<User[] | null> = this.usersService.user$

  constructor(private usersService: UsersService, private router: Router,) { }
  signOut() {
    this.usersService.signOutUser()
  }

  ngOnInit() {
    this.usersService.getUser()
  }
}
