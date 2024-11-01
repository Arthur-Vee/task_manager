import { Component } from '@angular/core'
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms'
import { MaterialModule } from '../../../material.module'
import { NgIf, NgFor, CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { Store } from '@ngrx/store'
import AppState from '../../../store/app.state'
import * as userSelectors from '../../../store/user/user.selectors'
import * as userActions from '../../../store/user/user.actions'
import { UserGroup } from '../../../models/user.model'
import { UserGroupSignal } from '../../../service/userGroup/userGroup-signal/userGroup-signal.service'

@Component({
  selector: 'app-create-user-group',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    NgIf,
    NgFor,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './create-user-group.component.html',
  styleUrl: './create-user-group.component.scss',
})
export class CreateUserGroupComponent {
  createUserGroupForm: FormGroup | null = null
  users$ = this.store.select(userSelectors.selectAllUsers)
  editing: boolean = false

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private userGroupSignal: UserGroupSignal
  ) {
    this.createUserGroupForm = this.fb.group({
      groupName: new FormControl('', Validators.required),
      groupDescription: new FormControl(''),
      groupMembers: new FormControl('', Validators.required),
    })
    this.store.dispatch(userActions.loadUsers())
  }
  createUserGroup() {
    if (this.createUserGroupForm?.valid) {
      const userGroup: UserGroup = this.createUserGroupForm.value
      this.userGroupSignal.createUserGroup(userGroup)
      this.createUserGroupForm.reset()
      this.editing = false
    } else {
      console.log('User Group creation failed.')
    }
  }
}
