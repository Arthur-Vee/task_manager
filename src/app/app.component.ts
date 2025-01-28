import { Component, Inject, PLATFORM_ID } from '@angular/core'
import { RouterOutlet, RouterLink } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { TaskComponent } from './components/task/task.component'
import { MaterialModule } from './material.module'
import { CommonModule, DOCUMENT, isPlatformServer } from '@angular/common'
import { LoginPageComponent } from './components/login-page/login-page.component'
import { Observable } from 'rxjs'
import { User } from './models/user.model'
import { TranslateModule } from '@ngx-translate/core'
import { AppService } from './service/app/app.service'

import { Store } from '@ngrx/store'
import {
  selectCurrentUser,
  selectIsLoggedIn,
} from './store/user/user.selectors'
import * as userActions from './store/user/user.actions'
import { TaskSignal } from './service/tasks/tasks-signal/tasks-signal.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Task Manager'
  isLoggedIn$: Observable<string | null> = this.store.select(selectIsLoggedIn)
  user$: Observable<User | null>
  isServer: boolean | null = null
  localStorage: Storage | undefined

  constructor(
    private store: Store,
    public appService: AppService,
    private tasksSignal: TaskSignal,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isServer = isPlatformServer(platformId)
    this.localStorage = document.defaultView?.localStorage

    this.user$ = this.store.select(selectCurrentUser)
  }
  ngOnInit(): void {
    this.store.dispatch(userActions.getCurrentUser())
    this.tasksSignal.loadAllTasks()
  }
  signOut(): void {
    this.store.dispatch(userActions.signOutUser())
  }
}
