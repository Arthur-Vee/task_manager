import { Component } from '@angular/core'
import { MaterialModule } from '../../material.module'
import { ActivatedRoute } from '@angular/router'
import { map, Observable, take } from 'rxjs'
import { User, UpdateUserRoles } from '../../models/user.model'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'

import { Store } from '@ngrx/store'
import * as userActions from '../../store/user/user.actions'
import * as userSelectors from '../../store/user/user.selectors'

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {

  individulaUserId: string | null = null

  individualUser$: Observable<User | null> = this.store.select(userSelectors.selectAllUsers).pipe(
    map(users => users.find(user => user.id === this.individulaUserId) || null),
    take(1))


  userDetailsForm: FormGroup = this.fb.group({
    defaultRole: new FormControl("USER"),
    assignedUserRole: new FormControl("")
  })

  assigning: boolean = false

  constructor(private store: Store, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }
  ngOnInit() {
    this.activatedRoute.params.pipe(map((params) => params['id'] as string),
      take(1)
    ).subscribe((userId) => {
      this.store.dispatch(userActions.loadUsers())
      this.individulaUserId = userId
    })
  }
  editUserRole() {
    this.assigning = true
  }
  updateUserRole(updatedUserRole: FormGroup) {
    var filteredRoleArray = Object.values(updatedUserRole).filter(Boolean)
    var updatedUserDetails: UpdateUserRoles = {
      updatedUserId: this.individulaUserId,
      updatedUserRoles: filteredRoleArray
    }
    this.store.dispatch(userActions.updateUserRole({ userId: this.individulaUserId, updateUserRole: updatedUserDetails }))
    this.assigning = false
  }
}
