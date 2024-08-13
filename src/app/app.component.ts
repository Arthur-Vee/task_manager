import { Component, Inject, PLATFORM_ID } from '@angular/core'
import { RouterOutlet, RouterLink } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { TaskComponent } from './components/task/task.component'
import { MaterialModule } from './material.module'
import { CommonModule, DOCUMENT, isPlatformServer } from '@angular/common'
import { LoginPageComponent } from './components/login-page/login-page.component'
import { UsersService } from './service/users/users.service'
import { Observable } from 'rxjs'
import { User } from './models/user.model'
import { TranslateModule } from '@ngx-translate/core'
import { AppService } from './service/app/app.service'

import { select, Store } from '@ngrx/store'
import { selectCurrentUser } from './store/user/user.selectors'




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
    LoginPageComponent,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'Task Manager'

  isLoggedIn$: Observable<String | null> = this.usersService.isLoggedIn$
  user$: Observable<User | null> | undefined


  isServer: boolean | null = null

  constructor(private store:Store ,public appService: AppService, private usersService: UsersService, @Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) platformId: Object) {
    this.isServer = isPlatformServer(platformId)
  }
  ngOnInit(): void {
    this.user$ = this.store.pipe(select(selectCurrentUser))

    this.user$.subscribe(user => {
      console.log("Current User:", user)
    }) // For testing
  }
  signOut(): void {
    this.usersService.signOutUser()
  }
}
