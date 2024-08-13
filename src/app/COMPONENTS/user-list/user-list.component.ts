import { Component, signal } from '@angular/core'
import { UsersService } from '../../service/users/users.service'
import { NgIf, NgFor, CommonModule } from '@angular/common'
import { MaterialModule } from '../../material.module'
import { Router } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

import { Store } from '@ngrx/store'
import * as selectors from '../../store/user/user.selectors'
import * as userActions from '../../store/user/user.actions'

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CommonModule,
    MaterialModule,
    TranslateModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  allUsers$ = this.store.select(selectors.selectAllUsers)
  readonly panelOpenState = signal(false)

  constructor(private usersService: UsersService, private router: Router, private store:Store) { }
ngOnInit() {
  this.store.dispatch(userActions.loadUsers())
}
  redirectToUserDetails(userId: string) {
    this.router.navigate(['users/' + userId])
  }

}
